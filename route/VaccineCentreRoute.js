const router = require("express").Router();
const { UserAuthMiddleware, AdminAuthMiddleware } = require("../middleware/AuthMiddleware");
const VaccineCentreController = require("./../controller/VaccineCentreController");

router.post("/", AdminAuthMiddleware, VaccineCentreController.createVaccineCenter);
router.get("/", UserAuthMiddleware, VaccineCentreController.getVaccineCentres);
router.post("/vaccine", AdminAuthMiddleware, VaccineCentreController.addVaccineToVaccineCentre)
router.get("/:vaccineCentreId/slots", UserAuthMiddleware, VaccineCentreController.getAvailableSlots);
router.get("/:vaccineCentreId/vaccine", UserAuthMiddleware, VaccineCentreController.getVaccinesByVaccineCentre);
router.get("/:vaccineCentreId", UserAuthMiddleware, VaccineCentreController.getVaccineCentre);



module.exports = router;
