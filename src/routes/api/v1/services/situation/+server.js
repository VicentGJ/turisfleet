import sequelize from '$lib/db'
import { json, error } from '@sveltejs/kit'
import { situationsTable as table } from '$lib/tables'

export async function GET({ url }) {
  const { searchParams: params } = url //query parameters
  const limit = params.get('limit')
  const situation_type = params.get('situation_type')
  const result = await sequelize
    .transaction(async (t) => {
      return await sequelize.query(
        `SELECT * FROM situations ${
          situation_type != 'any'
            ? "WHERE situation_type='" + situation_type + "'"
            : ''
        } LIMIT ${limit}`,
        {
          type: sequelize.QueryTypes.SELECT,
          transaction: t,
        }
      )
    })
    .catch((err) => {
      throw error(400, err)
    })
  return json(result)
}

export async function POST({ request }) {
  const body = await request.json() //new car situation
  const result = await sequelize
    .transaction(async (t) => {
      try {
        await sequelize.query(
          `SELECT insert_situation(:situation_name, :situation_type)`,
          {
            replacements: body,
            type: sequelize.QueryTypes.SELECT,
            transaction: t,
          }
        )
        //select the created situation to return it
        const created = await sequelize.query(
          `SELECT * FROM ${table} s ORDER BY id_situation DESC LIMIT 1`,
          {
            type: sequelize.QueryTypes.SELECT,
            transaction: t,
            replacements: {
              plate_number: body.plate_number,
            },
          }
        )
        return created
      } catch (e) {
        throw error(400, e)
      }
    })
    .catch((err) => {
      throw error(400, err)
    })
  return json(result[0])
}
