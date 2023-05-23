import sequelize from '$lib/db'
import { json, error } from '@sveltejs/kit'
import { rolesTable as table } from '$lib/tables'
export async function GET() {
  const result = await sequelize
    .transaction(async (t) => {
      return await sequelize.query(`SELECT * FROM ${table}`, {
        type: sequelize.QueryTypes.SELECT,
        transaction: t,
      })
    })
    .catch((err) => {
      throw error(400, { message: err.message })
    })
  return json(result)
}
