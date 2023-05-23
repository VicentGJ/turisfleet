import sequelize from '$lib/db'
import { error, json } from '@sveltejs/kit'
import { usersTable as table, rolesTable } from '$lib/tables'

export async function GET({ params }) {
  const { id_user } = params
  const result = await sequelize
    .transaction(async (t) => {
      const result = await sequelize.query(
        `SELECT u.id_user, u.username, r.role_name 
                FROM ${table} u
                JOIN ${rolesTable} r 
                ON u.id_role= r.id_role
                WHERE id_user = :id_user`,
        {
          type: sequelize.QueryTypes.SELECT,
          transaction: t,
          replacements: { id_user },
        }
      )
      return result
    })
    .catch((err) => {
      throw error(400, { message: err.message })
    })
  if (result.length == 0)
    throw error(404, { message: `User with id ${id_user} not found` })
  return json(result[0])
}

export async function DELETE({ params }) {
  const { id_user } = params
  const result = await sequelize
    .transaction(async (t) => {
      const result = await sequelize.query(
        `DELETE FROM ${table} WHERE id_user= :id_user`,
        {
          replacements: { id_user },
          type: sequelize.QueryTypes.DELETE,
          transaction: t,
        }
      )
      return result
    })
    .catch((err) => {
      throw error(400, { message: err.message })
    })
  return json(result)
}

export async function PUT({ params, request }) {
  const { id_user: identifier } = params
  const body = await request.json() //new attribute values for user
  const result = await sequelize
    .transaction(async (t) => {
      await sequelize.query(
        `UPDATE ${table}
                SET username=:username
                WHERE id_user = :identifier`,
        {
          type: sequelize.QueryTypes.UPDATE,
          transaction: t,
          replacements: {
            ...body,
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
