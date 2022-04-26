import express from "express";
import controller from "../controllers/appointment/appointment.controller";
import auth from "../middlewares/auth.middleware";
const router = express.Router();


router.post("/",auth, controller.addAppointment);
router.post("/list", controller.getAppointments);
router.get('/:Appointmentid', controller.getAppointment);
router.put('/:Appointmentid', controller.updateAppointment);
router.delete('/:Appointmentid', controller.deleteAppointment);

export = router;

// no need to pass userID
