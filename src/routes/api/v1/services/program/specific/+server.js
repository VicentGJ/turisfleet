import sequelize from "$lib/db";
import { json, error } from "@sveltejs/kit";
import { specificProgramTable as table } from "$lib/tables";
export async function GET({ url }) {
    const { searchParams: params } = url //query parameters
    const limit = params.get("limit")
    const result = await sequelize.transaction(async (t) => {
        const result = await sequelize.query(
            `SELECT get_specific_programs()`,
            {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
            }
        );
        const cursor = result[0].get_specific_programs;
        return await sequelize.query(
            `FETCH ${limit} IN "${cursor}"`,
            {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
            });
    });
    return json(result);
}


export async function POST({ request }) {
    const body = await request.json(); //new group
    const result = await sequelize.transaction(async (t) => {
        try {
            await sequelize.query(
                `SELECT insert_specific_program(:id_program, :description, :start, :duration, :km)`,
                {
                    replacements: body,
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                }
            );
            //since this happens inside a transaction the inserted value will always be the last until commit because of transaction isolation
            const created = await sequelize.query(
                `SELECT * FROM ${table} ORDER BY id_specific_program DESC LIMIT 1`,
                {
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                }
            )
            return created;
        } catch (e) {
            throw error(400, e)
        }
    });
    return json(result[0]);
}