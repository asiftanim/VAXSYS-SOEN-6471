const VaccineController = require("../controller/VaccineController");

const router = require("express").Router();
router.post("/", VaccineController.createVaccine);
router.get("/", VaccineController.getVaccines);
router.get("/:vaccineId", VaccineController.getVaccine);
module.exports = router;
