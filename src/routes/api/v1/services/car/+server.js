import sequelize from "$lib/db";
import { json, error } from "@sveltejs/kit";

export async function GET({ url }) {
    const { searchParams: params } = url //query parameters
    const result = await sequelize.transaction(async (t) => {
        const result = await sequelize.query(
            "SELECT get_cars()",
            {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
            }
        );

        const cursor = result[0].get_cars;
        const cars = await sequelize.query(`FETCH ${params.get('limit')} IN "${cursor}"`, {
            type: sequelize.QueryTypes.SELECT,
            transaction: t,
        });

        return cars;
    });
    return json(result);
}


export async function POST({ request }) {
    const body = await request.json(); //new car
    const result = await sequelize.transaction(async (t) => {
        try {
            await sequelize.query(
                "SELECT insert_car(:plate_number, :brand, :seat_amount, :available_km)",
                {
                    replacements: body,
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                }
            );
            //select the created car to return it
            const car = await sequelize.query(
                "SELECT * FROM cars c WHERE c.plate_number = :plate_number",
                {
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                    replacements: {
                        plate_number: body.plate_number
                    }
                }
            )
            return car;
        } catch (e) {
            throw error(400, e)
        }
    });
    return json(result[0]);
}
