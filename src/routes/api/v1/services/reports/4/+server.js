import sequelize from '$lib/db'
import { error, json } from '@sveltejs/kit'
import { carSituationsTable, situationsTable, carTable } from '$lib/tables'
export async function GET() {
  const result = await sequelize
    .transaction(async (t) => {
      let result = await sequelize.query(
        `SELECT date,plate_number,situation_name,return_date from ${carSituationsTable} cs 
            JOIN ${situationsTable} s ON cs.situation_id_situation=s.id_situation
            JOIN ${carTable} ca ON ca.id_car=cs.car_id_car
            ORDER BY date DESC`,
        {
          type: sequelize.QueryTypes.SELECT,
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
