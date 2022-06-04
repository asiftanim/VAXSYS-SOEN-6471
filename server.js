const dotenv = require("dotenv").config();
const app = require("express")();
const { sequelize } = require("./connection/database");
const cors = require("cors");
const bodyParser = require("body-parser");
const ExeptionMiddleware = require("./middleware/ExceptionMiddleware");
const config = require("./config");
const UserRoute = require("./route/UserRoute");
const AppointmentRoute = require("./route/AppointmentRoute");

//-----Middlewares-----//

//To parse body of requests
app.use(bodyParser.urlencoded({ extended: false })); // extended false will accept only string and array
app.use(bodyParser.json());

//To remove the powered by header
app.disable("x-powered-by");

//To enable CORS
let corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  exposedHeaders: ["authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

//Application Routes
app.use("/api/user", UserRoute);
app.use("/api/appointment", AppointmentRoute);

//Error handling middleware
app.use(ExeptionMiddleware);

//Handling uncaught exceptions
process
  .on("unhandledRejection", (reason, p) => {
    console.log("UnhandledRejection: ", reason);
    process.exit(1);
  })
  .on("uncaughtException", (err) => {
    console.log("UncaughtException: ", err);
    process.exit(1);
  });

//Initializing DB
sequelize
  .sync()
  .then((result) => {
    return sequelize.authenticate();
  })
  .then(() => {
    console.log("DB connected successfully");
    //Start Server
    app.listen(config.PORT, function () {
      console.log("Server started on port: " + config.PORT);
    });
  })
  .catch((err) => {
    console.log("Unable to connect to db: ", err);
    process.exit(0);
  });
