import sequelize from "$lib/db";
import { error, json } from "@sveltejs/kit";
import { driverTable as table } from "$lib/tables";

export async function GET({ params }) {
    const id_number = params.id
    const result = await sequelize.transaction(async (t) => {
        const result = await sequelize.query(
            `SELECT * FROM ${table} WHERE id_number = :id_number`,
            {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
                replacements: { id_number }
            }
        )
        return result;
    });
    if (result.length == 0) throw error(404, { 'message': `Driver with id ${id_number} not found` })
    return json(result[0]);
}


export async function DELETE({ params }) {
    const id_number = params.id
    const result = await sequelize.transaction(async (t) => {
        try {
            return await sequelize.query(
                `DELETE FROM ${table} WHERE id_number = :id_number`,
                {
                    replacements: { id_number },
                    type: sequelize.QueryTypes.DELETE,
                    transaction: t,
                }
            )
        } catch (e) {
            throw new error(400, { message: e })
        }
        return result;
    });
    return json(result);
}


export async function PUT({ params, request }) {
    const identifier = params.id
    const body = await request.json();//new attribute values for driver
    const result = await sequelize.transaction(async (t) => {
        await sequelize.query(
            `UPDATE ${table} SET id_number = :id_number, name = :name, address = :address, category = :category 
            WHERE id_number = :identifier`,
            {
                type: sequelize.QueryTypes.UPDATE,
                transaction: t,
                replacements: {
                    ...body,
                    identifier,
                }
            }
        )
        return await sequelize.query(
            `SELECT * FROM ${table}
            ORDER BY id_driver DESC LIMIT 1`,
            {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
            }
        )
    })
    if (result.length === 0) throw new error(404, { message: `Driver with id ${identifier} not found` })
    return json(result[0]);
}