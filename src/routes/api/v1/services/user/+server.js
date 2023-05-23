import sequelize from '$lib/db'
import { json, error } from '@sveltejs/kit'
import { usersTable as table, rolesTable } from '$lib/tables'
import { env } from '$env/dynamic/private'
import CryptoJS from 'crypto-js'

function createSaltedString(username, password, id_role, timestamp = Date.now()) {
    const salt = CryptoJS.SHA256(env.SECRET_KEY).toString()
    const data = `${username}${password}${id_role}${timestamp}${salt}`;
    const verysalty = CryptoJS.SHA256(data).toString();
    return verysalty;
}
export async function GET({ url }) {
    const { searchParams: params } = url //query parameters
    const limit = params.get('limit')
    const result = await sequelize
        .transaction(async (t) => {
            const result = await sequelize.query(`SELECT get_users()`, {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
            })
            const cursor = result[0].get_users
            return await sequelize.query(`FETCH ${limit} IN "${cursor}"`, {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
            })
        })
        .catch((err) => {
            throw error(400, { message: err.message })
        })
    return json(result)
}

export async function POST({ request }) {
    const body = await request.json() //new group
    const { username, password, id_role } = body
    const salt = createSaltedString(username, password, id_role);
    const result = await sequelize
        .transaction(async (t) => {
            const hashed = CryptoJS.SHA256(salt + password).toString()
            const user = await sequelize.query(
                `SELECT insert_user(:username, :hashed, :id_role, :salt)`,
                {
                    replacements: {
                        username, id_role, salt, hashed
                    },
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                }
            )
            const id_user = user[0].insert_user
            const created = await sequelize.query(
                `SELECT u.id_user, u.username, r.role_name 
                FROM ${table} u
                JOIN ${rolesTable} r 
                ON u.id_role= r.id_role
                WHERE id_user = :id_user`,
                {
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                    replacements: { id_user }
                }
            )
            return created
        })
        .catch((err) => {
            throw error(400, { message: err.message })
        })
    return json(result[0])
}
