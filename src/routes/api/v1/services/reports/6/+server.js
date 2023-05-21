import sequelize from '$lib/db'
import { error, json } from '@sveltejs/kit'
import { driverTable, carTable } from '$lib/tables'
export async function GET() {
  const result = await sequelize
    .transaction(async (t) => {
      let result = await sequelize.query(
        `SELECT id_number,name,plate_number,brand FROM ${driverTable} d 
            JOIN ${carTable} ca ON d.idcar=ca.id_car`,
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
