const router = require("express").Router();
const { userAuthMiddleware, AdminAuthMiddleware } = require("../middleware/AuthMiddleware");
const VaccineCentreController = require("./../controller/VaccineCentreController");

router.post("/", AdminAuthMiddleware, VaccineCentreController.createVaccineCenter);
router.get("/", userAuthMiddleware, VaccineCentreController.getVaccineCentres);
router.post("/vaccine", AdminAuthMiddleware, VaccineCentreController.addVaccineToVaccineCentre)
router.get("/:vaccineCentreId/slots", userAuthMiddleware, VaccineCentreController.getAvailableSlots);
router.get("/:vaccineCentreId/vaccine", userAuthMiddleware, VaccineCentreController.getVaccinesByVaccineCentre);
router.get("/:vaccineCentreId", userAuthMiddleware, VaccineCentreController.getVaccineCentre);



module.exports = router;
