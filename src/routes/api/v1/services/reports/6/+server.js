import sequelize from '$lib/db'
import { carTable, driverTable, driversCarsTable } from '$lib/tables'
import { error, json } from '@sveltejs/kit'
export async function GET() {
  const result = await sequelize
    .transaction(async (t) => {
      let result = await sequelize.query(
        `SELECT d.name as "Driver Name",c.brand as "Brand",c.plate_number as "Plate Number"
          FROM ${driverTable} d
          LEFT JOIN ${driversCarsTable} ds ON ds.id_driver=d.id_driver
          LEFT JOIN ${carTable} c ON c.id_car=ds.id_car;`,
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
