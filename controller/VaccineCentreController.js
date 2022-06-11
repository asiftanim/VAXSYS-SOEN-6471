const {
  VaccineCentre,
  Vaccine,
  Appointment,
  Op,
} = require("./../connection/database");
const constants = require("../util/constants");
const message = require("../util/message");
const helper = require("./../util/helper");
const moment = require("moment");
const config = require("../config");

function getEndTime(startTime) {
  return moment(startTime, "HH:mm:ss")
    .add(config.APPOINTMENT_DURATION, "minutes")
    .format("HH:mm:ss");
}

module.exports = {
  createVaccineCenter: async (req, res, next) => {
    try {
      let { name, description, address, startTime, endTime } = req.body;
      let newVaccineCenter = await VaccineCentre.create({
        name: name,
        description: description,
        address: address,
        startTime: startTime,
        endTime: endTime,
      });
      helper.createResponse(
        res,
        constants.SUCCESS,
        message.CREATED_SUCCESSFULLY("Vaccine Centre"),
        {
          name: newVaccineCenter.name,
          description: newVaccineCenter.description,
        }
      );
    } catch (err) {
      console.log(__filename, "createVaccineCenter()", err.message, err.stack);
      next(err);
    }
  },

  getVaccineCentres: async (req, res, next) => {
    try {
      let vaccineCentreList = await VaccineCentre.findAll();
      helper.createResponse(
        res,
        constants.SUCCESS,
        message.FETCHED_SUCCESSFULLY("Vaccine Centres"),
        vaccineCentreList
      );
    } catch (err) {
      console.log(__filename, "getVaccineCentres()", err.message, err.stack);
      next(err);
    }
  },

  getVaccineCentre: async (req, res, next) => {
    try {
      let { vaccineCentreId } = req.params;
      let vaccineCentre = await VaccineCentre.findByPk(vaccineCentreId);
      helper.createResponse(
        res,
        constants.SUCCESS,
        message.FETCHED_SUCCESSFULLY("Vaccine Centre"),
        vaccineCentre
      );
    } catch (err) {
      console.log(__filename, "getVaccineCentre()", err.message, err.stack);
      next(err);
    }
  },

  addVaccineToVaccineCentre: async (req, res, next) => {
    try {
      let { vaccineCentreId, vaccineId } = req.body;
      let vaccineCentre = await VaccineCentre.findByPk(vaccineCentreId);
      let vaccine = await Vaccine.findByPk(vaccineId);
      await vaccineCentre.addVaccine(vaccine);
      helper.createResponse(
        res,
        constants.SUCCESS,
        message.CREATED_SUCCESSFULLY("Vaccine and Vaccine centre association"),
        {}
      );
    } catch (err) {
      console.log(
        __filename,
        "addVaccineToVaccineCentre()",
        err.message,
        err.stack
      );
      next(err);
    }
  },

  getVaccinesByVaccineCentre: async (req, res, next) => {
    try {
      let { vaccineCentreId } = req.params;
      let vaccineCentre = await VaccineCentre.findByPk(vaccineCentreId);
      let vaccineList = await vaccineCentre.getVaccines({
        joinTableAttributes: [],
      });
      helper.createResponse(
        res,
        constants.SUCCESS,
        message.FETCHED_SUCCESSFULLY("Vaccines"),
        vaccineList
      );
    } catch (err) {
      console.log(
        __filename,
        "getVaccinesByVaccineCentre()",
        err.message,
        err.stack
      );
      next(err);
    }
  },

  getAvailableSlots: async (req, res, next) => {
    try {
      let { vaccineCentreId } = req.params;
      let vaccineCentre = await VaccineCentre.findByPk(vaccineCentreId);
      let appointmentList = [];
      if (!vaccineCentre) {
        throw new BaseException(
          message.DOES_NOT_EXIST("Vaccine Centre"),
          constants.BAD_REQUEST
        );
      }
      let date = new Date(req.query.date).setHours(00, 00, 00) ? req.query.date : new Date().setHours(00, 00, 00);
      appointmentList = await vaccineCentre.getAppointments({
        where: {
          appointmentDate: date
        },
        joinTableAttributes: [],
      });
      letStartTimes = appointmentList.map(
        (appointment) => appointment.appointmentStartTime
      );
      let availableSlotList = [];
      let tempStartTime = moment(vaccineCentre.startTime, "HH:mm:ss").format("HH:mm:ss");
      while (
        moment(getEndTime(tempStartTime), "HH:mm:ss").isSameOrBefore(
          moment(vaccineCentre.endTime, "HH:mm:ss")
        )
      ) {
        if (!letStartTimes.includes(tempStartTime)) {
          availableSlotList.push({
            startTime: tempStartTime,
            endTime: getEndTime(tempStartTime),
          });
        }
        tempStartTime = getEndTime(tempStartTime);
      }
      helper.createResponse(
        res,
        constants.SUCCESS,
        message.FETCHED_SUCCESSFULLY("Available slots"),
        availableSlotList
      );
    } catch (err) {
      console.log(__filename, "getAvailableSlots()", err.message, err.stack);
      next(err);
    }
  },
};
