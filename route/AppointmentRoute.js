const router = require("express").Router();
const AppointmentController = require("./../controller/AppointmentController");

router.post("/", AppointmentController.createAppointment);
router.get("/", AppointmentController.getAppointments);
router.get("/:appointmentId", AppointmentController.getAppointment);
module.exports = router;