import sequelize from '$lib/db'
import { error, json } from '@sveltejs/kit'
import { carSituationsTable, situationsTable, carTable } from '$lib/tables'
export async function GET() {
  const result = await sequelize
    .transaction(async (t) => {
      let result = await sequelize.query(
        `SELECT 
          date as "Date",
          plate_number as "Car number",
          situation_name as "Situation",
          return_date as "Return Date"
          FROM ${carSituationsTable} cs 
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
