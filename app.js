require("dotenv").config();
const Express = require("express");
var cors = require("cors");
const db = require("./db");

const app = Express();
app.use(cors());

// Import middlewares as a bundle
// const middlewares = require("./middleware");

// Import controllers as a bundle
const controllers = require("./controllers");

// Parse the body of all requests as JSON
app.use(require("./middleware/headers"));

app.use(Express.json());

app.use("/user", controllers.User);
app.use("/recipe", controllers.Recipe);
app.use("/comments", controllers.Comments);

db.authenticate()
  .then(() => db.sync({}))
  .then(() =>
  app.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.Port}`)
  })
  )
  .catch((e) => {
    console.log("[server]: Server Crashed");
    console.log(e);
  });

 