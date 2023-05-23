import sequelize from '$lib/db'
import { error, json } from '@sveltejs/kit'
export async function GET() {
    const result = await sequelize
        .transaction(async (t) => {
            let result = await sequelize.query(
                `SELECT get_requests_modifications()`,
                {
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                }
            )
            const cursor = result[0].get_requests_modifications
            return await sequelize.query(`FETCH ALL IN "${cursor}"`, {
                transaction: t,
                type: sequelize.QueryTypes.SELECT,
            })
        })
        .catch((err) => {
            throw error(400, { message: err.message })
        })
    return json(result)
}
