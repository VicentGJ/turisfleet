import sequelize from '$lib/db'
import { error, json } from '@sveltejs/kit'
import { driverCategoriesTable as table, driverTable } from '$lib/tables'

export async function GET({ params }) {
  let { id_driver } = params
  const result = await sequelize
    .transaction(async (t) => {
      return await sequelize.query(
        `SELECT * FROM ${table} where drivers_id_driver = :id_driver`,
        {
          type: sequelize.QueryTypes.SELECT,
          transaction: t,
          replacements: { id_driver },
        }
      )
    })
    .catch((err) => {
      throw error(400, { message: err.message })
    })
  return json(result)
}

export async function PUT({ params, request }) {
  const { id_driver } = params
  const body = await request.json() //new attribute values for driver
  const result = await sequelize
    .transaction(async (t) => {
      for (let category of body) {
        await sequelize.query(
          `SELECT insert_driver_category(:id_driver, :category)`,
          {
            type: sequelize.QueryTypes.UPDATE,
            transaction: t,
            replacements: { category, id_driver },
          }
        )
      }
      return await sequelize.query(
        `SELECT * FROM ${driverTable}
            WHERE id_driver=:id_driver`,
        {
          type: sequelize.QueryTypes.SELECT,
          transaction: t,
          replacements: { id_driver },
        }
      )
    })
    .catch((err) => {
      throw error(400, { message: err.message })
    })
  if (result.length === 0)
    throw new error(404, { message: `Driver with id ${id_driver} not found` })
  return json(result[0])
}

export async function DELETE({ params }) {
  const { id_driver } = params
  const result = await sequelize
    .transaction(async (t) => {
      return await sequelize.query(
        `SELECT delete_driver_license_category(:id_driver)`,
        {
          type: sequelize.QueryTypes.UPDATE,
          transaction: t,
          replacements: { id_driver },
        }
      )
    })
    .catch((err) => {
      //TODO
      if (err.message) {
        throw error(400, err)
      } else
        throw error(500, {
          message: 'Fatal error, contact your system administrator',
        })
    })
  return json(result)
}
