const { DataTypes } = require("sequelize");
const db = require("../db");
const Comments = db.define("comments", {
  comments: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Comments;
