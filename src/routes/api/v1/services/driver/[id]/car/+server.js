import sequelize from "$lib/db";
import { error, json } from "@sveltejs/kit";
import { driverTable as table, carTable } from "$/lib/tables";

export async function GET({ params }) {
    const id_number = params.id
    const result = await sequelize.transaction(async (t) => {
        const result = await sequelize.query(
            `SELECT idcar FROM ${table} WHERE id_number = :id_number`,
            {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
                replacements: { id_number }
            }
        )
        if (result.length === 0)
            throw new error(404, { message: `Driver with id ${id_number} not found` });

        const id_car = result[0].idcar
        return await sequelize.query(
            `SELECT * FROM ${carTable} WHERE id_car = :id_car`,
            {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
                replacements: { id_car }
            }
        )
    });
    return json(result[0]);
}

export async function POST({ params, request }) {
    const identifier = params.id
    const body = await request.json();
    const result = sequelize.transaction(async (t) => {
        await sequelize.query(
            `UPDATE ${table}
            SET idcar = :id_car
            WHERE id_number = :identifier`,
            {
                type: sequelize.QueryTypes.UPDATE,
                transaction: t,
                replacements: {
                    identifier,
                    ...body
                }

            }
        )
        const result = await sequelize.query(
            `SELECT * FROM ${table} WHERE id_number = :identifier`,
            {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
                replacements: { identifier }
            }
        )
        return result
    })
    if (result.length === 0) throw new error(404, { message: `Couldn't find the recently created driver` })
    return json(result[0])
}

export async function DELETE({ params }) {
    const id_number = params.id
    const result = await sequelize.transaction(async (t) => {
        await sequelize.query(
            `UPDATE ${table} SET idcar = NULL WHERE id_number = :id_number`,
            {
                type: sequelize.QueryTypes.UPDATE,
                transaction: t,
                replacements: { id_number }
            }
        )
        return await sequelize.query(
            `SELECT * FROM ${table} WHERE id_number = :id_number`,
            {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
                replacements: { id_number }
            }
        )
    });
    if (result.length === 0) throw new error(404, { message: `Driver with id ${id_number} not found` });
    return json(result[0]);
}


export async function PUT({ params, request }) {
    const identifier = params.id
    const body = await request.json();//new attribute values for driver
    const result = await sequelize.transaction(async (t) => {
        //TODO
    })
    return json(result[0]);
}