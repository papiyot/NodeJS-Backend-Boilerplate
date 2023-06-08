"use strict";
const { DataTypes } = require("sequelize");

module.exports = async function ({ db, bcrypt }) {
  const Model = db.define(
    "Users",
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        uniqe: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Roles",
          key: "id",
        },
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
    }
  );

  Model.sync({ alter: true });
  Model.hasOne(db.models.Roles, { foreignKey: "id", sourceKey: "roleId" });
  Model.beforeUpdate(async (field, options) => {
    const hashedPassword = await bcrypt.hash(field.password);
    field.password = hashedPassword;
    console.log("update Users")
  });
  Model.beforeCreate(async (field, options) => {
    const hashedPassword = await bcrypt.hash(field.password);
    field.password = hashedPassword;
    console.log("create Users")
  });
  
  // $2a$12$19VwIvn.gnc/36por5N2KOk9WP4Xc5yrtm/UFXms0h8pYKnNRbevC
};
