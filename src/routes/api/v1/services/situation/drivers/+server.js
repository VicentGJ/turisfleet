import sequelize from '$lib/db'
import {
  driverTable,
  situationsTable,
  driverSituationsTable as table,
} from '$lib/tables'
import { error, json } from '@sveltejs/kit'

export async function GET({ url }) {
  const { searchParams: params } = url //query parameters
  const limit = params.get('limit')
  const result = await sequelize
    .transaction(async (t) => {
      const result = await sequelize.query(
        `SELECT st.situation_name,d.id_number,d.name,s.*
        FROM ${table} s 
        JOIN ${driverTable} d ON s.driver_id_driver=d.id_driver
        JOIN ${situationsTable} st ON st.id_situation=s.situation_id_situation
        ORDER BY date DESC LIMIT ${limit}`,
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

export async function POST({ request }) {
  const body = await request.json() //new car situation
  const result = await sequelize
    .transaction(async (t) => {
      try {
        const result = await sequelize.query(
          `
                INSERT INTO ${table} (driver_id_driver, situation_id_situation, date, return_date) 
                VALUES (:driver_id_driver, :situation_id_situation, :date, :return_date)
                RETURNING *;
                `,
          {
            replacements: body,
            type: sequelize.QueryTypes.INSERT,
            transaction: t,
          }
        )
        return result[0]
      } catch (e) {
        throw error(400, e)
      }
    })
    .catch((err) => {
      throw error(400, { message: err.message })
    })
  return json(result[0])
}

export async function DELETE({ url }) {
  const { searchParams: params } = url //query parameters
  const driver_id = params.get('driver_id_driver')
  const date = params.get('date')
  const result = await sequelize
    .transaction(async (t) => {
      const result = await sequelize.query(
        `DELETE FROM ${table} WHERE driver_id_driver = :driver_id AND date = :date`,
        {
          type: sequelize.QueryTypes.DELETE,
          transaction: t,
          replacements: {
            driver_id,
            date,
          },
        }
      )
      return result
    })
    .catch((err) => {
      throw error(400, { message: err.message })
    })
  return json(result)
}

export async function PUT({ params, request, url }) {
  const { searchParams: identifier } = url
  const body = await request.json()
  const result = await sequelize
    .transaction(async (t) => {
      await sequelize.query(
        `
            UPDATE ${table}
            SET driver_id_driver = :driver_id_driver, situation_id_situation = :situation_id_situation, date = :date, return_date = :return_date
            WHERE driver_id_driver = :car_id AND date = :date_id
            `,
        {
          type: sequelize.QueryTypes.UPDATE,
          transaction: t,
          replacements: {
            ...body,
            car_id: identifier.get('driver_id_driver'),
            date_id: identifier.get('date'),
          },
        }
      )
      return await sequelize.query(
        `
            SELECT * FROM ${table}
            WHERE driver_id_driver = :car_id AND date = :date_id
            `,
        {
          type: sequelize.QueryTypes.SELECT,
          transaction: t,
          replacements: {
            car_id: body.driver_id_driver,
            date_id: body.date,
          },
        }
      )
    })
    .catch((err) => {
      throw error(400, { message: err.message })
    })
  if (result.length === 0)
    throw new error(404, {
      message: `Situation with id ${identifier} not found`,
    })
  return json(result[0])
}
