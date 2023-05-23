import sequelize from '$lib/db'
import { json, error } from '@sveltejs/kit'
import { usersTable as table } from '$lib/tables'
import CryptoJS from 'crypto-js';
import cookie from 'cookie'
export async function POST({ request }) {
    const body = await request.json()
    const { username, password } = body
    const result = await sequelize
        .transaction(async (t) => {
            const s = await sequelize.query(`
            SELECT u.salt 
            FROM ${table} u
            WHERE u.username = :username`,
                {
                    transaction: t,
                    type: sequelize.QueryTypes.SELECT,
                    replacements: { username }
                })
            if (s.length === 0) throw new Error('Incorrect username or password')
            const salt = s[0].salt
            const salted = CryptoJS.SHA256(salt + password).toString()
            const login = await sequelize.query(`SELECT login(:username, :salted)`, {
                transaction: t,
                type: sequelize.QueryTypes.SELECT,
                replacements: { username, salted }
            })
            if (login.length === 0) throw new Error('Incorrect username or password')
            return login
        })
        .catch((err) => {
            throw error(401, { message: err.message })
        })
    const loginString = result[0].login;//"(id,username,role)"
    const loginArray = loginString.slice(1, -1).split(',');//[id,username,role]
    const login = {
        id_user: parseInt(loginArray[0]),
        username: loginArray[1],
        id_role: parseInt(loginArray[2])
    };
    // const sessionID = login
    // const headers = {
    //     'Set-Cookie': cookie.serialize('sessionID', JSON.stringify(sessionID), {
    //         // httpOnly: true,
    //         maxAge: 60 * 60 * 24 // 1 day
    //     })
    // };
    return json(login
        // , { headers }
    )
}
