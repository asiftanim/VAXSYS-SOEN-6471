const Sequelize = require("sequelize");
const config = require("./../config");
const UserModel = require("./../model/User");
const AppointmentModel = require("./../model/Appointment");
const VaccineModel = require("./../model/Vaccine");
const VaccineCentreModel = require("./../model/VaccineCentre");

const sequelize = new Sequelize(
  config.DATABASE,
  config.DB_USERNAME,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    dialect: config.DB_DIALECT,
    logging: false,
  }
);

//Models
const User = UserModel(sequelize, Sequelize);
const Appointment = AppointmentModel(sequelize, Sequelize);
const Vaccine = VaccineModel(sequelize, Sequelize);
const VaccineCentre = VaccineCentreModel(sequelize, Sequelize);

//Mappings
// Appointment.belongsToMany(User, { through: "user_appointments" });
User.hasMany(Appointment);
Appointment.belongsTo(User);

Vaccine.hasMany(Appointment);
Appointment.belongsTo(Vaccine)

Vaccine.belongsToMany(User, { through: "user_vaccines" });
User.belongsToMany(Vaccine, { through: "user_vaccines" });

Vaccine.belongsToMany(VaccineCentre, { through: "vaccine_vaccineCentres" });
VaccineCentre.belongsToMany(Vaccine, { through: "vaccine_vaccineCentres" });


module.exports = {
  sequelize: sequelize,
  User: User,
  Appointment: Appointment,
  Vaccine: Vaccine,
  VaccineCentre: VaccineCentre,
  Op: Sequelize.Op,
};
