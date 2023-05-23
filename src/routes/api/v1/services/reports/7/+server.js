import sequelize from '$lib/db'
import { error, json } from '@sveltejs/kit'
export async function GET({ url }) {
  const id_request = url.searchParams.get('id_request')
  const result = await sequelize
    .transaction(async (t) => {
      let result = await sequelize.query(
        `SELECT dragging_cars_by_request(:id_request)`,
        {
          type: sequelize.QueryTypes.SELECT,
          transaction: t,
          replacements: { id_request },
        }
      )
      const cursor = result[0].dragging_cars_by_request
      return await sequelize.query(`FETCH ALL IN "${cursor}"`, {
        transaction: t,
        type: sequelize.QueryTypes.SELECT,
      })
    })
    .catch((err) => {
      throw error(400, { message: err.message })
    })
  return json(result)
}
