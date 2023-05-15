import { Sequelize } from "sequelize";
import { env } from "$env/dynamic/private";

const sequelize = new Sequelize(
  env.DB_NAME,
  env.DB_USER,
  env.DB_PASS,
  {
    host: env.DB_HOST,
    dialect: "postgres",
  }
);
export default sequelize;
