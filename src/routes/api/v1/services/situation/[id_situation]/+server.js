import sequelize from "$lib/db";
import { error, json } from "@sveltejs/kit";
import { situationsTable as table } from "$lib/tables";

export async function GET({ params }) {
    const { id_situation } = params
    const result = await sequelize.transaction(async (t) => {
        const result = await sequelize.query(
            `SELECT * FROM ${table} WHERE id_situation = :id_situation`,
            {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
                replacements: { id_situation }
            }
        )
        return result;
    });
    if (result.length == 0) throw error(404, { 'message': `Situation with id ${id_situation} not found` })
    return json(result[0]);
}


export async function DELETE({ params }) {
    const { id_situation } = params
    const result = await sequelize.transaction(async (t) => {
        const result = await sequelize.query(
            `DELETE FROM ${table} WHERE id_situation = :id_situation`,
            {
                replacements: { id_situation },
                type: sequelize.QueryTypes.DELETE,
                transaction: t,
            }
        )
        return result;
    });
    return json(result);
}


export async function PUT({ params, request }) {
    const { id_situation: identifier } = params
    const body = await request.json();//new attribute values for car
    const result = await sequelize.transaction(async (t) => {
        await sequelize.query(
            `
            UPDATE ${table}
            SET situation_name = :situation_name, situation_type = :situation_type
            WHERE id_situation = :identifier
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
            `
            SELECT * FROM ${table}
            WHERE id_situation = :identifier
            `,
            {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
                replacements: {
                    identifier
                }
            }
        )

    })
    if (result.length === 0) throw new error(404, { message: `Situation with id ${identifier} not found` })
    return json(result[0]);
}