const { DataTypes } = require("sequelize");
const db = require("../db");
const Comments = db.define("comments", {
  comments: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  photoURL: {
    type: DataTypes.STRING(2000), //to limit the data
    allowNull: false,
  },
});

module.exports = Comments;
