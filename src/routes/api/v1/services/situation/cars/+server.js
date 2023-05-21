import sequelize from '$lib/db'
import { json, error } from '@sveltejs/kit'
import { carSituationsTable as table } from '$lib/tables'

export async function GET({ url }) {
  const { searchParams: params } = url //query parameters
  const limit = params.get('limit')
  const result = await sequelize
    .transaction(async (t) => {
      const result = await sequelize.query(
        `SELECT * FROM ${table} ORDER BY date DESC LIMIT ${limit}`,
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

export async function POST({ request }) {
  const body = await request.json() //new car situation
  const result = await sequelize
    .transaction(async (t) => {
      try {
        const result = await sequelize.query(
          `
                INSERT INTO ${table} (car_id_car, situation_id_situation, date, return_date) 
                VALUES (:car_id_car, :situation_id_situation, :date, :return_date)
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
      throw error(400, err)
    })
  return json(result[0])
}

export async function DELETE({ url }) {
  const { searchParams: params } = url //query parameters
  const car_id = params.get('car_id_car')
  const date = params.get('date')
  const result = await sequelize
    .transaction(async (t) => {
      const result = await sequelize.query(
        `DELETE FROM ${table} WHERE car_id_car = :car_id AND date = :date`,
        {
          type: sequelize.QueryTypes.DELETE,
          transaction: t,
          replacements: {
            car_id,
            date,
          },
        }
      )
      return result
    })
    .catch((err) => {
      throw error(400, err)
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
            SET car_id_car = :car_id_car, situation_id_situation = :situation_id_situation, date = :date, return_date = :return_date
            WHERE car_id_car = :car_id AND date = :date_id
            `,
        {
          type: sequelize.QueryTypes.UPDATE,
          transaction: t,
          replacements: {
            ...body,
            car_id: identifier.get('car_id_car'),
            date_id: identifier.get('date'),
          },
        }
      )
      return await sequelize.query(
        `
            SELECT * FROM ${table}
            WHERE car_id_car = :car_id AND date = :date_id
            `,
        {
          type: sequelize.QueryTypes.SELECT,
          transaction: t,
          replacements: {
            car_id: body.car_id_car,
            date_id: body.date,
          },
        }
      )
    })
    .catch((err) => {
      throw error(400, err)
    })
  if (result.length === 0)
    throw new error(404, {
      message: `Situation with id ${identifier} not found`,
    })
  return json(result[0])
}
