import sequelize from '$lib/db'
import { error, json } from '@sveltejs/kit'
import { specificProgramTable as table } from '$lib/tables'

export async function GET({ params }) {
  const { id_specific_program } = params
  const result = await sequelize
    .transaction(async (t) => {
      const result = await sequelize.query(
        `SELECT * FROM ${table} WHERE id_specific_program = :id_specific_program and disable=false`,
        {
          type: sequelize.QueryTypes.SELECT,
          transaction: t,
          replacements: { id_specific_program },
        }
      )
      return result
    })
    .catch((err) => {
      throw error(400, { message: err.message })
    })
  if (result.length == 0)
    throw error(404, {
      message: `Specific program with id ${id_specific_program} not found`,
    })
  return json(result[0])
}

export async function DELETE({ params }) {
  const { id_specific_program } = params
  const result = await sequelize
    .transaction(async (t) => {
      const result = await sequelize.query(
        `DELETE FROM ${table} WHERE id_specific_program = :id_specific_program`,
        {
          replacements: { id_specific_program },
          type: sequelize.QueryTypes.DELETE,
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

export async function PUT({ params, request }) {
  const { id_specific_program: identifier } = params
  const body = await request.json() //new attribute values for car
  const result = await sequelize.transaction(async (t) => {
    await sequelize.query(
      `UPDATE ${table}
        SET id_program=:id_program, description=:description, start=:start, duration=:duration, km=:km
        WHERE id_specific_program = :identifier`,
      {
        type: sequelize.QueryTypes.UPDATE,
        transaction: t,
        replacements: {
          ...body,
          identifier,
        },
      }
    )
    return await sequelize.query(
      `SELECT * FROM ${table} WHERE id_specific_program = :identifier`,
      {
        type: sequelize.QueryTypes.SELECT,
        transaction: t,
        replacements: { identifier },
      }
    )
  })
  if (result.length === 0)
    throw new error(404, { message: `Program with id ${identifier} not found` })
  return json(result[0])
}
