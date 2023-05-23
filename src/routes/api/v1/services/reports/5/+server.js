import sequelize from '$lib/db'
import { error, json } from '@sveltejs/kit'
import {
  driverSituationsTable,
  situationsTable,
  driverTable,
} from '$lib/tables'
export async function GET() {
  const result = await sequelize
    .transaction(async (t) => {
      let result = await sequelize.query(
        `SELECT id_number as "Driver ID",
        name as "Driver name",
        situation_name as "Situation",
        date as "Date",
        return_date as "Return Date" 
        FROM ${driverSituationsTable} ds
        JOIN ${situationsTable} s ON ds.situation_id_situation=s.id_situation
        JOIN ${driverTable} d ON d.id_driver=ds.driver_id_driver`,
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
