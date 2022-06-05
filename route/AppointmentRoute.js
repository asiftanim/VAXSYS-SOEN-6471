const router = require("express").Router();
const { userAuthMiddleware, AdminAuthMiddleware } = require("../middleware/AuthMiddleware");
const AppointmentController = require("./../controller/AppointmentController");

router.post("/", userAuthMiddleware, AppointmentController.createAppointment);
router.get("/", userAuthMiddleware, AppointmentController.getAppointments);
router.get("/:appointmentId", userAuthMiddleware, AppointmentController.getAppointment);
module.exports = router;