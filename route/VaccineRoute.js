const VaccineController = require("../controller/VaccineController");
const { userAuthMiddleware, AdminAuthMiddleware } = require("../middleware/AuthMiddleware");

const router = require("express").Router();
router.post("/", AdminAuthMiddleware, VaccineController.createVaccine);
router.get("/", userAuthMiddleware, VaccineController.getVaccines);
router.get("/:vaccineId", userAuthMiddleware, VaccineController.getVaccine);
module.exports = router;
