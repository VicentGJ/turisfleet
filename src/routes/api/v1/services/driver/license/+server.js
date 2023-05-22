import sequelize from '$lib/db'
import { json, error } from '@sveltejs/kit'
import { driverTable, driverCategoriesTable } from '$lib/tables'

export async function GET() {
  const result = await sequelize
    .transaction(async (t) => {
      return await sequelize.query(
        `SELECT ${driverTable}.*, ${driverCategoriesTable}.license_category_category_name
FROM ${driverTable}
LEFT JOIN ${driverCategoriesTable} ON ${driverTable}.id_driver = ${driverCategoriesTable}.drivers_id_driver`,
        {
          type: sequelize.QueryTypes.SELECT,
          transaction: t,
        }
      )
    })
    .catch((err) => {
      throw error(400, { message: err.message })
    })
  return json(result)
}
