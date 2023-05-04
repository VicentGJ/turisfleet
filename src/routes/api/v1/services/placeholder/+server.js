import sequelize from "$lib/db";
import { json } from "@sveltejs/kit";

export async function GET({ url }) {
    const { searchParams: params } = url //query parameters
    const result = await sequelize.transaction(async (t) => {
        const result = await sequelize.query(
            "SELECT obreros_de_empresa(:companyId)",
            {
                replacements: { companyId: params.get('compID') },
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
            }
        );

        const cursor = result[0].obreros_de_empresa;
        const users = await sequelize.query(`FETCH ${params.get('limit')} IN "${cursor}"`, {//or fetch all ;)
            type: sequelize.QueryTypes.SELECT,
            transaction: t,
        });

        return users;
    });
    return json(result);
}
