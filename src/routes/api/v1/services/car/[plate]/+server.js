import sequelize from "$lib/db";
import { error, json } from "@sveltejs/kit";
import { carTable as table } from "$lib/tables";
export async function GET({ params }) {
    const plate_number = params.plate
    const result = await sequelize.transaction(async (t) => {
        const result = await sequelize.query(
            `SELECT * FROM ${table} WHERE plate_number = :plate_number`,
            {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
                replacements: { plate_number }
            }
        )
        return result;
    });
    if (result.length == 0) throw error(404, { 'message': `Car with plate number ${plate_number} not found` })
    return json(result[0]);
}


export async function DELETE({ params }) {
    const plate_number = params.plate
    const result = await sequelize.transaction(async (t) => {
        const result = await sequelize.query(
            `DELETE FROM ${table} WHERE plate_number = :plate_number`,
            {
                replacements: { plate_number },
                type: sequelize.QueryTypes.DELETE,
                transaction: t,
            }
        )
        return result;
    });
    return json(result);
}


export async function PUT({ params, request }) {
    const identifier = params.plate
    const body = await request.json();//new attribute values for car
    const result = await sequelize.transaction(async (t) => {
        await sequelize.query(
            `
            UPDATE ${table}
            SET plate_number = :plate_number, seat_amount = :seat_amount, available_km = :available_km 
            WHERE plate_number = :identifier
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
            `SELECT * FROM ${table} WHERE plate_number = :plate_number`,
            {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
                replacements: {
                    plate_number: body.plate_number
                }
            }
        )
    })

    if (result.length === 0) throw new error(404, { message: `Car with plate ${identifier} not found` })
    return json(result[0]);
}