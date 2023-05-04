/**
 * @link https://sequelize.org/docs/v6/core-concepts/model-basics/
 * 
 * @link https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
 */
import sequelize from "$lib/db";
import DataTypes from "sequelize";

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
});
