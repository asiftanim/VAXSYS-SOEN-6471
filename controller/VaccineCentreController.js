const { VaccineCentre, Vaccine } = require("./../connection/database");
const constants = require("../util/constants");
const message = require("../util/message");
const helper = require("./../util/helper");

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
      console.log(__filename, "addVaccineToVaccineCentre()", err.message, err.stack);
      next(err);
    }
  },

  getVaccinesByVaccineCentre: async (req, res, next) => {
    try {
      let { vaccineCentreId } = req.params;
      let vaccineCentre = await VaccineCentre.findByPk(vaccineCentreId);
      let vaccineList = await vaccineCentre.getVaccines();
      helper.createResponse(
        res,
        constants.SUCCESS,
        message.FETCHED_SUCCESSFULLY("Vaccines"),
        vaccineList
      );
    } catch (err) {
      console.log(__filename, "getVaccinesByVaccineCentre()", err.message, err.stack);
      next(err);
    }
  },
};
