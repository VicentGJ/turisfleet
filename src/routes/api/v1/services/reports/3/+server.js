import sequelize from '$lib/db'
import { error, json } from '@sveltejs/kit'
import { carTable, driverTable, groupTable, requestTable } from '$lib/tables'
export async function GET({ url }) {
  const date = url.searchParams.get('date')
  const result = await sequelize
    .transaction(async (t) => {
      let result = await sequelize.query(
        `SELECT rt.*, gt.* 
            FROM ${requestTable} rt
            WHERE rt.date = :date'
            LEFT JOIN rt.id_group ON ${groupTable}.id_group
            
            ORDER BY rt.date DESC`,
        {
          type: sequelize.QueryTypes.SELECT,
          transaction: t,
          replacements: {
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
