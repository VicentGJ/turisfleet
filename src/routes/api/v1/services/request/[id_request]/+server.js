import sequelize from '$lib/db'
import { error, json } from '@sveltejs/kit'
import { requestTable as table } from '$lib/tables'

export async function GET({ params }) {
  const { id_request } = params
  const result = await sequelize
    .transaction(async (t) => {
      const result = await sequelize.query(
        `SELECT * FROM ${table} WHERE id_request = :id_request`,
        {
          type: sequelize.QueryTypes.SELECT,
          transaction: t,
          replacements: { id_request },
        }
      )
      return result
    })
    .catch((err) => {
      throw error(400, err)
    })
  if (result.length == 0)
    throw error(404, { message: `Request with id ${id_request} not found` })
  return json(result[0])
}

export async function DELETE({ params }) {
  const { id_request } = params
  const result = await sequelize
    .transaction(async (t) => {
      const result = await sequelize.query(
        `DELETE FROM ${table} WHERE id_request = :id_request`,
        {
          replacements: { id_request },
          type: sequelize.QueryTypes.DELETE,
          transaction: t,
        }
      )
      return result
    })
    .catch((err) => {
      throw error(400, err)
    })
  return json(result)
}

export async function PUT({ params, request }) {
  const { id_request: identifier } = params
  const body = await request.json() //new attribute values for car
  const result = await sequelize
    .transaction(async (t) => {
      await sequelize.query(
        `
            UPDATE ${table}
            SET id_car=:id_car,id_copilot=:id_copilot,date=:date,id_specific_program=:id_specific_program
            WHERE id_request = :identifier
            `,
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
        `SELECT * FROM ${table} WHERE id_request = :identifier`,
        {
          type: sequelize.QueryTypes.SELECT,
          transaction: t,
          replacements: { identifier },
        }
      )
    })
    .catch((err) => {
      throw error(400, err)
    })
  if (result?.length === 0)
    throw new error(404, { message: `Request with id ${identifier} not found` })
  return json(result[0])
}
