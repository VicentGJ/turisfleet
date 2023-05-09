import sequelize from "$lib/db";
import { error, json } from "@sveltejs/kit";
import { carSituationsTable as table } from "$lib/tables";

export async function DELETE({ params }) {
    const { id_situation } = params
    const result = await sequelize.transaction(async (t) => {
        const result = await sequelize.query(
            `DELETE FROM ${table} WHERE situation_id_situation = :id_situation`,
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