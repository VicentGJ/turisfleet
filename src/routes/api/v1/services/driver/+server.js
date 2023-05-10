import sequelize from "$lib/db";
import { json, error } from "@sveltejs/kit";
import { driverTable as table } from "$lib/tables";

export async function GET({ url }) {
    const { searchParams: params } = url //query parameters
    const limit = params.get('limit')
    const result = await sequelize.transaction(async (t) => {
        const result = await sequelize.query(
            `SELECT get_drivers()`,
            {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
            }
        );

        const cursor = result[0].get_drivers;
        const cars = await sequelize.query(
            `FETCH ${limit} IN "${cursor}"`,
            {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
            });

        return cars;
    });
    return json(result);
}


export async function POST({ request }) {
    const body = await request.json(); //new driver
    const result = await sequelize.transaction(async (t) => {
        try {
            await sequelize.query(
                `SELECT insert_driver(:id_number, :name, :address, :category)`,
                {
                    replacements: body,
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                }
            );
            return await sequelize.query(
                `SELECT * FROM ${table} ORDER BY id_driver DESC LIMIT 1`,
                {
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                }
            );
        } catch (e) {
            throw error(400, e)
        }
    });
    return json(result[0]);
}
