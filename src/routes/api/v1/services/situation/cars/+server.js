import sequelize from "$lib/db";
import { json, error } from "@sveltejs/kit";
import { carSituationsTable as table } from "$lib/tables";

export async function GET({ url }) {
    const { searchParams: params } = url //query parameters
    const limit = params.get("limit")
    const result = await sequelize.transaction(async (t) => {
        const result = await sequelize.query(
            `SELECT * FROM ${table} LIMIT ${limit}`,
            {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
            }
        );
        return result;
    });
    return json(result);
}


export async function POST({ request }) {
    const body = await request.json(); //new car situation
    const result = await sequelize.transaction(async (t) => {
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
            );
            return result[0]
        } catch (e) {
            throw error(400, e)
        }
    });
    return json(result[0]);
}


export async function DELETE({ url }) {
    const { searchParams: params } = url //query parameters
    const car_id = params.get('car_id_car')
    const date = params.get('date')
    const result = await sequelize.transaction(async (t) => {
        const result = await sequelize.query(
            `DELETE FROM ${table} WHERE car_id_car = :car_id AND date = :date`,
            {
                type: sequelize.QueryTypes.DELETE,
                transaction: t,
                replacements: {
                    car_id, date
                }
            }
        );
        return result;
    });
    return json(result);
}