module.exports = {
  //ENVIRONMENT
  ENVIRONMENT: "dev",
  PORT: 3000,

  //DB CONFIG
  DB_USERNAME: "root",
  DB_PASSWORD: process.env.MYSQL_PASSWORD,
  DATABASE: "vaxsys",
  DB_HOST: "127.0.0.1",
  DB_DIALECT: "mysql",

  //APPOINTMENT
  APPOINTMENT_DURATION: 30
};
