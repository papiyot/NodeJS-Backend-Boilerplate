"use strict";
const { DataTypes } = require("sequelize");

module.exports = async function ({db}) {
  const Roles = db.define(
    "Roles",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, { } );

    Roles.sync({ alter: true });
};
