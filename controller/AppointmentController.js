const { VaccineCentre, Appointment, Op } = require("./../connection/database");
const constants = require("../util/constants");
const message = require("../util/message");
const helper = require("./../util/helper");
const moment = require("moment");
const BaseException = require("../exception/BaseException");
const config = require("../config");

function getEndTime(startTime) {
  return moment(startTime, "HH:mm:ss")
    .add(config.APPOINTMENT_DURATION, "minutes")
    .format("HH:mm:ss");
}

module.exports = {
  createAppointment: async (req, res, next) => {
    try {
      let {
        vaccineCentreId,
        vaccineId,
        address,
        age,
        medications,
        allergies,
        appointmentDate,
        appointmentStartTime,
      } = req.body;

      appointmentDate = new Date(
        new Date(appointmentDate).setHours(00, 00, 00)
      );

      appointmentEndTime = getEndTime(appointmentStartTime);

      let vaccineCentre = await VaccineCentre.findByPk(vaccineCentreId);
      if (
        moment(appointmentStartTime, "HH:mm:ss").isBefore(
          moment(vaccineCentre.startTime, "HH:mm:ss")
        ) ||
        moment(appointmentEndTime, "HH:mm:ss").isAfter(
          moment(vaccineCentre.endTime, "HH:mm:ss")
        )
      ) {
        throw new BaseException(
          message.VACCINE_CENTRE_CLOSED,
          constants.BAD_REQUEST
        );
      }

      let existingAppointment = await Appointment.findOne({
        where: {
          [Op.and]: [
            { appointmentDate: appointmentDate },
            { appointmentStartTime: appointmentStartTime },
          ],
        },
      });

      if (existingAppointment) {
        throw new BaseException(
          message.ALREADY_EXISTS("Appointment"),
          constants.BAD_REQUEST
        );
      }

      let appointment = await Appointment.create({
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        address: address,
        age: age,
        medications: medications,
        allergies: allergies,
        appointmentDate: appointmentDate,
        appointmentStartTime: appointmentStartTime,
        appointmentEndTime: appointmentEndTime,
        VaccineCentreId: vaccineCentreId,
        VaccineId: vaccineId,
        isCompleted: false,
        UserId: req.user.id
      });

      helper.createResponse(
        res,
        constants.SUCCESS,
        message.CREATED_SUCCESSFULLY("Appointment"),
        {}
      );
    } catch (err) {
      console.log(__filename, "createAppointment()", err.message, err.stack);
      next(err);
    }
  },

  getAppointments: async (req, res, next) => {
    try {
      let { vaccineCentreId } = req.query;
      let vaccineCentre = await VaccineCentre.findByPk(vaccineCentreId);
      let appointmentList = [];
      let date = new Date(req.query.date).setHours(00, 00, 00) ? req.query.date : new Date().setHours(00, 00, 00);
      if (vaccineCentre) {
        appointmentList = await vaccineCentre.getAppointments({
          joinTableAttributes: [],
          where: {
            isCompleted: false,
            appointmentDate: date
          }
        });
      }

      helper.createResponse(
        res,
        constants.SUCCESS,
        message.FETCHED_SUCCESSFULLY("Appointments"),
        appointmentList
      );
    } catch (err) {
      console.log(__filename, "getAppointments()", err.message, err.stack);
      next(err);
    }
  },

  getAppointment: async (req, res, next) => {
    try {
      let { appointmentId } = req.params;
      let appointment = await Appointment.findByPk(appointmentId);
      helper.createResponse(
        res,
        constants.SUCCESS,
        message.FETCHED_SUCCESSFULLY("Appointment"),
        appointment
      );
    } catch (err) {
      console.log(__filename, "getAppointment()", err.message, err.stack);
      next(err);
    }
  },

  completeAppointment: async (req, res, next) => {
    try {
      let { id } = req.body;
      let appointment = await Appointment.findByPk(id);
      appointment.isCompleted = true;
      await appointment.save();
      helper.createResponse(
        res,
        constants.SUCCESS,
        message.UPDATED_SUCCESSFULLY("Appointment"),
        {
          id: id
        }
      );
    } catch (err) {
      console.log(__filename, "completeAppointment()", err.message, err.stack);
      next(err);
    }
  },
};
