const User = require("./user");
const Recipe = require("./recipe");
const Comments = require("./comments");

// Setup Associations
User.hasMany(Recipe);
Recipe.belongsTo(User);
Recipe.hasMany(Comments);
Comments.belongsTo(Recipe);

// User.hasMany(Comments);
// Comments.belongsTo(User);
module.exports = {
  User,
  Recipe,
  Comments,
};
