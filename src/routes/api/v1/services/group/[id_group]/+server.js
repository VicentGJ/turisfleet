import sequelize from "$lib/db";
import { error, json } from "@sveltejs/kit";
import { groupTable as table } from "$lib/tables";

export async function GET({ params }) {
    const { id_group } = params
    const result = await sequelize.transaction(async (t) => {
        const result = await sequelize.query(
            `SELECT * FROM ${table} WHERE id_group = :id_group`,
            {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
                replacements: { id_group }
            }
        )
        return result;
    });
    if (result.length == 0) throw error(404, { 'message': `Group with id ${id_group} not found` })
    return json(result[0]);
}


export async function DELETE({ params }) {
    const { id_group } = params
    const result = await sequelize.transaction(async (t) => {
        const result = await sequelize.query(
            `DELETE FROM ${table} WHERE id_group = :id_group`,
            {
                replacements: { id_group },
                type: sequelize.QueryTypes.DELETE,
                transaction: t,
            }
        )
        return result;
    });
    return json(result);
}


export async function PUT({ params, request }) {
    const { id_group: identifier } = params
    const body = await request.json();//new attribute values for car
    const result = await sequelize.transaction(async (t) => {
        await sequelize.query(
            `
            UPDATE ${table}
            SET country = :country, tourist_amount = :tourist_amount
            WHERE id_group = :identifier
            `,
            {
                type: sequelize.QueryTypes.UPDATE,
                transaction: t,
                replacements: {
                    ...body,
                    identifier
                }
            }
        )
        return await sequelize.query(
            `SELECT * FROM ${table} WHERE id_group = :identifier`,
            {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
                replacements: { identifier }
            }
        )
    })
    if (result.length === 0) throw new error(404, { message: `Group with id ${identifier} not found` })
    return json(result[0]);
}