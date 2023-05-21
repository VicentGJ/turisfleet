import sequelize from '$lib/db'
import { error, json } from '@sveltejs/kit'
import { carTable, driverCategoriesTable, driverTable } from '$lib/tables'
export async function GET() {
  const result = await sequelize
    .transaction(async (t) => {
      let result = await sequelize.query(
        `SELECT dt.*, dct.license_category_category_name, ct.plate_number
            FROM ${driverTable} dt
            LEFT JOIN ${carTable} ct ON ct.id_driver=dt.id_driver
            LEFT JOIN ${driverCategoriesTable} dct ON dct.drivers_id_driver=dt.id_driver
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
      throw error(400, err)
    })
  return json(result)
}
