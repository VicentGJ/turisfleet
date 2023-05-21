import sequelize from '$lib/db'
import { json, error } from '@sveltejs/kit'
import { carTable as table } from '$lib/tables'
export async function GET({ url }) {
  const { searchParams: params } = url //query parameters
  const limit = params.get('limit')
  const result = await sequelize
    .transaction(async (t) => {
      const result = await sequelize.query(`SELECT get_cars()`, {
        type: sequelize.QueryTypes.SELECT,
        transaction: t,
      })

      const cursor = result[0].get_cars
      const cars = await sequelize.query(`FETCH ${limit} IN "${cursor}"`, {
        type: sequelize.QueryTypes.SELECT,
        transaction: t,
      })

      return cars
    })
    .catch((err) => {
      throw error(400, err)
    })
  return json(result)
}

export async function POST({ request }) {
  const body = await request.json() //new car
  const result = await sequelize.transaction(async (t) => {
    try {
      await sequelize.query(
        `SELECT insert_car(:plate_number, :brand, :seat_amount, :available_km, :id_driver, :id_category)`,
        {
          replacements: body,
          type: sequelize.QueryTypes.SELECT,
          transaction: t,
        }
      )
      return await sequelize.query(
        `SELECT * FROM ${table} ORDER BY id_car DESC LIMIT 1`,
        {
          type: sequelize.QueryTypes.SELECT,
          transaction: t,
        }
      )
    } catch (e) {
      console.log(e)
      throw error(400, e)
    }
  })
  return json(result[0])
}
