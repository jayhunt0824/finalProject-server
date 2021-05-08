const { DataTypes } = require("sequelize");
const db = require("../db");

const Recipe = db.define("recipe", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  ingredients: {
    type: DataTypes.STRING(2000),
    allowNull: false,
  },
  directions: {
    type: DataTypes.STRING(2000),
    allowNull: false,
  },
  categories: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  photoURL: {
    type: DataTypes.STRING(2000), //to limit the data
    allowNull: false,
  },
  // userId: {
  //   type: DataTypes.INTEGER,
  // },
});
module.exports = Recipe;
