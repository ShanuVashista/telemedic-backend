import express from "express";
import controller from "../controllers/appointment/appointment.controller";
const router = express.Router();

router.get("/", controller.getAppointments);
router.get('/:Appointmentid', controller.getAppointment);
router.put('/:Appointmentid', controller.updateAppointment);
router.delete('/:Appointmentid', controller.deleteAppointment);
router.post("/", controller.addAppointment);

export = router;

// no need to pass userID
