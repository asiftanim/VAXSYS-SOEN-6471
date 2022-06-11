const router = require("express").Router();
const { UserAuthMiddleware, AdminAuthMiddleware } = require("../middleware/AuthMiddleware");
const AppointmentController = require("./../controller/AppointmentController");

router.post("/", UserAuthMiddleware, AppointmentController.createAppointment);
router.post("/complete/:appointmentId", AdminAuthMiddleware, AppointmentController.completeAppointment);
router.get("/", UserAuthMiddleware, AppointmentController.getAppointments);
router.get("/:appointmentId", UserAuthMiddleware, AppointmentController.getAppointment);
module.exports = router;