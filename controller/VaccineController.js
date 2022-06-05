const { VaccineCentre } = require("./../connection/database");
const { Vaccine } = require("./../connection/database");
const constants = require("../util/constants");
const message = require("../util/message");
const helper = require("./../util/helper");

module.exports = {
  createVaccine: async (req, res, next) => {
    try {
      let { name, description, doseThreshold, minAge, category } = req.body;
      let newVaccine = await Vaccine.create({
        name: name,
        description: description,
        doseThreshold: doseThreshold,
        minAge: minAge,
        category: category,
      });
      helper.createResponse(
        res,
        constants.SUCCESS,
        message.CREATED_SUCCESSFULLY("Vaccine"),
        {
          name: newVaccine.name,
          description: newVaccine.description,
        }
      );
    } catch (err) {
      console.log(__filename, "createVaccine()", err.message, err.stack);
      next(err);
    }
  },

  getVaccines: async (req, res, next) => {
    try {
      let vaccineList = await Vaccine.findAll();
      helper.createResponse(
        res,
        constants.SUCCESS,
        message.FETCHED_SUCCESSFULLY("Vaccines"),
        vaccineList
      );
    } catch (err) {
      console.log(__filename, "getVaccines()", err.message, err.stack);
      next(err);
    }
  },

  getVaccine: async (req, res, next) => {
    try {
      let { vaccineId } = req.params;
      let vaccine = await Vaccine.findByPk(vaccineId);
      helper.createResponse(
        res,
        constants.SUCCESS,
        message.FETCHED_SUCCESSFULLY("Vaccine"),
        vaccine
      );
    } catch (err) {
      console.log(__filename, "getVaccine()", err.message, err.stack);
      next(err);
    }
  },
};
