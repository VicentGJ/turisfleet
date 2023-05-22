import sequelize from '$lib/db'
import { error, json } from '@sveltejs/kit'
import { carTable, driverCategoriesTable, driverTable } from '$lib/tables'
export async function GET({ params }) {
  const { identifier } = params
  const result = await sequelize
    .transaction(async (t) => {
      let result = await sequelize.query(
        `select d.*, dlc.license_category_category_name
from ${driverTable} d 
join ${carTable} c on c.id_driver=d.id_driver 
join ${driverCategoriesTable} dlc on dlc.drivers_id_driver=d.id_driver
where id_car=:identifier`,
        {
          type: sequelize.QueryTypes.SELECT,
          transaction: t,
          replacements: { identifier },
        }
      )
      return result
    })
    .catch((err) => {
      throw error(400, { message: err.message })
    })
  if (result.length == 0)
    throw error(404, {
      message: `Car with plate number ${identifier} not found`,
    })
  return json(result[0])
}
