import sequelize from '$lib/db'
import { error, json } from '@sveltejs/kit'
import {
  carTable,
  driverTable,
  driversCarsTable,
  groupTable,
  programTable,
  requestTable,
  specificProgramTable,
} from '$lib/tables'
export async function GET({ url }) {
  const date = url.searchParams.get('date')
  const result = await sequelize
    .transaction(async (t) => {
      let result = await sequelize.query(
        `SELECT r.date AS "Date",
       p.program_name AS "Program type",
       c.plate_number AS "Car number",
       d.name AS "Driver name",
       cp.name AS "Copilot name",
       g.id_group AS "Group number",
       g.country AS "Group country",
       r.tourist_amount AS "Tourist amount",
       sp.start AS "Start time",
       sp.description AS "Program description"
      FROM ${requestTable} r
      LEFT JOIN ${groupTable} g ON r.id_group=g.id_group
      LEFT JOIN ${specificProgramTable} sp ON r.id_specific_program=sp.id_specific_program
      LEFT JOIN ${programTable} p ON p.id_program=sp.id_program
      LEFT JOIN ${carTable} c ON c.id_car=r.id_car
      LEFT OUTER JOIN ${driversCarsTable} a ON c.id_car=a.id_car
      LEFT OUTER JOIN ${driverTable} d ON a.id_driver=d.id_driver
      LEFT JOIN ${driverTable} cp ON cp.id_driver=r.id_copilot
      WHERE r.date = :date
`,
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
