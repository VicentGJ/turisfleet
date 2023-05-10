import type { Sequelize } from "sequelize";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_NAME: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_HOST: string;
    }
  }
}

declare module "@sveltejs/kit" {
  interface Locals {
    sequelize: Sequelize;
  }
}
