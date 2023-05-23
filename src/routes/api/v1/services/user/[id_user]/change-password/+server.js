import sequelize from '$lib/db'
import { error, json } from '@sveltejs/kit'
import { usersTable as table, rolesTable } from '$lib/tables'
import { env } from '$env/dynamic/private'
import CryptoJS from 'crypto-js'

function createSaltedString(
  username,
  password,
  id_role,
  timestamp = Date.now()
) {
  const salt = CryptoJS.SHA256(env.SECRET_KEY).toString()
  const data = `${username}${password}${id_role}${timestamp}${salt}`
  const verysalty = CryptoJS.SHA256(data).toString()
  return verysalty
}
export async function PUT({ params, request }) {
  const { id_user: identifier } = params
  const body = await request.json() //new attribute values for user
  const { password } = body
  const result = await sequelize
    .transaction(async (t) => {
      const u = await sequelize.query(
        `
            SELECT username,id_role FROM ${table} 
            WHERE id_user=:identifier
            `,
        {
          replacements: { identifier },
          transaction: t,
          type: sequelize.QueryTypes.SELECT,
        }
      )
      if (u.length === 0)
        throw error(404, `User with id ${identifier} already not found`)
      const { username, id_role } = u[0]
      const salt = createSaltedString(username, password, id_role)
      const hashed = CryptoJS.SHA256(salt + password).toString()
      await sequelize.query(
        `UPDATE ${table}
                SET password=:hashed, salt=:salt
                WHERE id_user = :identifier`,
        {
          type: sequelize.QueryTypes.UPDATE,
          transaction: t,
          replacements: {
            hashed,
            salt,
            identifier,
          },
        }
      )
      return await sequelize.query(
        `SELECT u.id_user, r.role_name, u.username
                 FROM ${table} u
                 JOIN ${rolesTable} r ON r.id_role = u.id_role
                 WHERE id_user = :identifier`,
        {
          type: sequelize.QueryTypes.SELECT,
          transaction: t,
          replacements: { identifier },
        }
      )
    })
    .catch((err) => {
      throw error(400, { message: err.message })
    })
  if (result.length === 0)
    throw new error(404, { message: `User with id ${identifier} not found` })
  return json(result[0])
}
