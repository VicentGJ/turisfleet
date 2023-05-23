import sequelize from '$lib/db'
import { error, json } from '@sveltejs/kit'
import {
  carTable,
  driverCategoriesTable,
  driverTable,
  driversCarsTable,
} from '$lib/tables'
export async function GET() {
  const result = await sequelize
    .transaction(async (t) => {
      let result = await sequelize.query(
        // `SELECT dt.*, dct.license_category_category_name, ct.plate_number
        //     FROM ${driverTable} dt
        //     LEFT JOIN ${carTable} ct ON ct.id_driver=dt.id_driver
        //     LEFT JOIN ${driverCategoriesTable} dct ON dct.drivers_id_driver=dt.id_driver
        //     ORDER BY dt.name
        //     `,
        `SELECT 
        dt.id_number as "Driver ID", 
        dt.name as "Driver name", 
        dt.address as "Driver Address", 
        dcat.license_category_category_name as "Category",
        ct.plate_number as "Car"
        FROM ${driverTable} dt
        LEFT JOIN  ${driversCarsTable} dct ON dct.id_driver=dt.id_driver
        LEFT JOIN ${carTable} ct ON ct.id_car=dct.id_car
        LEFT JOIN ${driverCategoriesTable} dcat ON dcat.drivers_id_driver=dt.id_driver
        ORDER BY dt.name
        `,
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
