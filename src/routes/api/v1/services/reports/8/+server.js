import sequelize from '$lib/db'
import { error, json } from '@sveltejs/kit'
export async function GET({ url }) {
    const id_car = url.searchParams.get('id_car')
    const date = url.searchParams.get('date')
    const result = await sequelize
        .transaction(async (t) => {
            let result = await sequelize.query(
                `SELECT get_roadmap(:date, :id_car, 'map')`,
                {
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                    replacements: {
                        id_car, date
                    }
                }
            )
            const cursor = result[0].get_roadmap

            const map = await sequelize.query(`FETCH ALL IN "map"`, {
                transaction: t,
                type: sequelize.QueryTypes.SELECT,
            })
            return { cursor: parseString(cursor), map }
        })
        .catch((err) => {
            throw error(400, { message: err.message })
        })


    return json(result)
}

function parseString(str) {
    const parts = str.match(/\(([^)]+)\)/)[1].split(",");
    return {
        plate_number: parts[0],
        km_remaining: parseInt(parts[1]),
        name: parts[3].replace(/"/g, "")
    };
}
