const router = require("express").Router();
const VaccineCentreController = require("./../controller/VaccineCentreController");

router.post("/", VaccineCentreController.createVaccineCenter);
router.get("/", VaccineCentreController.getVaccineCentres);
router.post("/vaccine", VaccineCentreController.addVaccineToVaccineCentre)
router.get("/:vaccineCentreId/slots", VaccineCentreController.getAvailableSlots);
router.get("/:vaccineCentreId/vaccine", VaccineCentreController.getVaccinesByVaccineCentre);
router.get("/:vaccineCentreId", VaccineCentreController.getVaccineCentre);



module.exports = router;
