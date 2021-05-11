const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',

//comment in and out if need to go back to local and comment back in before redeployment
  // dialectOptions: {
  //     ssl: {
  //         require: true,
  //         rejectUnauthorized: false, // very important
  //       }
  //   }




})

sequelize.authenticate().then(
  function () {
    console.log("Connected to finalProject postgres database");
  },
  function (err) {
    console.log(err);
  }
);

module.exports = sequelize;
