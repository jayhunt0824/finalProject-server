const User = require("./user");
const Recipe = require("./recipe");
const Comments = require("./comments");

// Setup Associations
User.hasMany(Recipe);
Recipe.belongsTo(User);
User.hasMany(Comments);
Comments.belongsTo(User);

// User.hasMany(Comments);
// Comments.belongsTo(User);
module.exports = {
  User,
  Recipe,
  Comments,
};
