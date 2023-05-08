import sequelize from "$lib/db";
import { json, error } from "@sveltejs/kit";
import { driverTable as table } from "$/lib/tables";

export async function GET({ url }) {
    const { searchParams: params } = url //query parameters
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
            `FETCH ${params.get('limit')} IN "${cursor}"`,
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
            //select the created driver to return it
            const created = await sequelize.query(
                `SELECT * FROM ${table} d WHERE d.id_number = :id_number`,
                {
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                    replacements: {
                        id_number: body.id_number,
                        table
                    }
                }
            )
            return created;
        } catch (e) {
            throw error(400, e)
        }
    });
    return json(result[0]);
}
