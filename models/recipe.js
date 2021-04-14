const { DataTypes } = require("sequelize");
const db = require("../db");

const Recipe = db.define("recipe", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  ingredients: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  directions: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categories: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
module.exports = Recipe;
