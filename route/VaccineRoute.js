const VaccineController = require("../controller/VaccineController");
const { UserAuthMiddleware, AdminAuthMiddleware } = require("../middleware/AuthMiddleware");

const router = require("express").Router();
router.post("/", AdminAuthMiddleware, VaccineController.createVaccine);
router.get("/", UserAuthMiddleware, VaccineController.getVaccines);
router.get("/:vaccineId", UserAuthMiddleware, VaccineController.getVaccine);
module.exports = router;
