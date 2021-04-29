const User = require("./user");
const MyRecipes = require("./myrecipes");
const Comments = require("./comments");

// Setup Associations
User.hasMany(MyRecipes);
MyRecipes.belongsTo(User);
MyRecipes.hasMany(Comments);
Comments.belongsTo(MyRecipes);

// User.hasMany(Comments);
// Comments.belongsTo(User);
module.exports = {
  User,
  MyRecipes,
  Comments,
};
