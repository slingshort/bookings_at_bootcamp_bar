const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Seating extends Model {}

Seating.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "seating",
  }
);

module.exports = Seating;
