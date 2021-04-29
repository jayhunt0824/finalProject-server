const { DataTypes } = require("sequelize");
const db = require("../db");

const MyRecipes = db.define("myrecipes", {
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
  // userId: {
  //   type: DataTypes.INTEGER,
  // },
});
module.exports = MyRecipes;
