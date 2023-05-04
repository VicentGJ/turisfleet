import sequelize from "$lib/db";

export async function handle({ request, resolve }) {
  request.locals.sequelize = sequelize;
  const response = await resolve(request);
  return response;
}
