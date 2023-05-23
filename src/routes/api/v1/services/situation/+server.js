import sequelize from '$lib/db'
import { json, error } from '@sveltejs/kit'
import { situationsTable as table } from '$lib/tables'

export async function GET({ url }) {
  const { searchParams: params } = url //query parameters
  const limit = params.get('limit')
  const situation_type = params.get('situation_type')
  const result = await sequelize
    .transaction(async (t) => {
      const result = await sequelize.query(
        `SELECT get_situations(${
          situation_type === 'any' ? null : "'" + situation_type + "'"
        })`,
        {
          type: sequelize.QueryTypes.SELECT,
          transaction: t,
        }
      )

      const cursor = result[0].get_situations
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
      throw error(400, { message: err.message })
    })
  return json(result[0])
}
