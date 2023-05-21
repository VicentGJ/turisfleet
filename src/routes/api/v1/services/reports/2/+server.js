import sequelize from '$lib/db'
import { error, json } from '@sveltejs/kit'
import { carTable, driverTable } from '$lib/tables'
export async function GET() {
  const result = await sequelize
    .transaction(async (t) => {
      let result = await sequelize.query(
        `SELECT plate_number,brand,seat_amount,available_km 
            FROM ${carTable}
            ORDER BY brand`,
        {
          type: sequelize.QueryTypes.SELECT,
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
