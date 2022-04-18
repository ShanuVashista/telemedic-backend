import express from "express";
import controller from "../controllers/appointment/appointment.controller";
const router = express.Router();

router.get("/", controller.getAppointments);
// router.get('/appointment/:id', controller.getAppointment);
// router.put('/appointment/:id', controller.updateAppointment);
router.post("/", controller.addAppointment);

export = router;

// no need to pass userID
