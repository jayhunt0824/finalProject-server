const Sequelize = require("sequelize");
const sequelize = new Sequelize("FinalProject", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});

sequelize.authenticate().then(
  function () {
    console.log("Connected to finalProject postgres database");
  },
  function (err) {
    console.log(err);
  }
);

module.exports = sequelize;
