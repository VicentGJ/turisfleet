import sequelize from "$lib/db";
import { error, json } from "@sveltejs/kit";

export async function GET({ params }) {
    const plate_number = params.plate
    const result = await sequelize.transaction(async (t) => {
        const result = await sequelize.query(
            "SELECT * FROM cars WHERE plate_number = :plate_number",
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
            "DELETE FROM cars WHERE plate_number = :plate_number",
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
        // const found = await sequelize.query(
        //     "SELECT * FROM cars WHERE identifier = :identifier",
        //     { transaction: t, replacements: { identifier }, type: sequelize.QueryTypes.SELECT }
        // )
        await sequelize.query(
            `
            UPDATE cars 
            SET plate_number = :plate_number, seat_amount = :seat_amount, available_km = :available_km 
            WHERE plate_number = :identifier
            `,
            {
                type: sequelize.QueryTypes.UPDATE,
                transaction: t,
                replacements: {
                    ...body,
                    identifier,
                }
            }
        )
        //get the edited tuple to return
        const result = await sequelize.query(
            "SELECT * FROM cars WHERE plate_number = :plate_number",
            {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
                replacements: {
                    plate_number: body.plate_number
                }
            }
        )
        if (result.length == 0) throw new error(404, { message: "The updated car was not found" })
        return result
    })
    return json(result[0]);
}