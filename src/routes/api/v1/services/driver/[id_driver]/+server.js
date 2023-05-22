import sequelize from '$lib/db'
import { error, json } from '@sveltejs/kit'
import { driverTable as table } from '$lib/tables'

export async function GET({ params }) {
  const { id_driver } = params
  const result = await sequelize
    .transaction(async (t) => {
      const result = await sequelize.query(
        `SELECT * FROM ${table} WHERE id_driver = :id_driver`,
        {
          type: sequelize.QueryTypes.SELECT,
          transaction: t,
          replacements: { id_driver },
        }
      )
      return result
    })
    .catch((err) => {
      throw error(400, { message: err.message })
    })
  if (result.length == 0)
    throw error(404, { message: `Driver with id ${id_driver} not found` })
  return json(result[0])
}

export async function DELETE({ params }) {
  const { id_driver } = params
  const result = await sequelize
    .transaction(async (t) => {
      return await sequelize.query(
        `DELETE FROM ${table} WHERE id_driver = :id_driver`,
        {
          replacements: { id_driver },
          type: sequelize.QueryTypes.DELETE,
          transaction: t,
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
      try {
        await sequelize.query(
          `UPDATE ${table} SET id_number = :id_number, name = :name, address = :address
WHERE id_driver = :id_driver`,
          {
            type: sequelize.QueryTypes.UPDATE,
            transaction: t,
            replacements: {
              ...body,
              id_driver,
            },
          }
        )
        return await sequelize.query(
          `SELECT * FROM ${table} WHERE id_driver=:id_driver`,
          {
            type: sequelize.QueryTypes.SELECT,
            transaction: t,
            replacements: { id_driver },
          }
        )
      } catch (err) {
        t.rollback()
        throw error(400, err)
      }
    })
    .catch((err) => {
      throw error(400, { message: err.message })
    })
  if (result.length === 0)
    throw new error(404, { message: `Driver with id ${id_driver} not found` })
  return json(result[0])
}
