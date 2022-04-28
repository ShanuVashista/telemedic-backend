import express from 'express';
import uploadFile from '../middlewares/fileUpload.middleware';
import Doctor_Register_POST from '../controllers/doctor/register';
import Professional_PUT from '../controllers/doctor/professional';
import Doctor_Appointment_PUT from '../controllers/doctor/appointment_update';
import auth from '../middlewares/auth.middleware';
import controller from '../controllers/doctor/prescription.controller';
import profileUpdate from '../controllers/doctor/profileUpdate';
import sickNote from '../controllers/doctor/sickNote';
import multer from 'multer';
import userRole from '../middlewares/userRole.middleware';
import { Roles } from '../lib/roles';
import { validateBody } from '../middlewares/joi.middleware';
import { addAvailability } from '../controllers/doctor/availability.controller';
import { addAvailabilitySchema } from '../validator/availability.validation';
const storage = multer.memoryStorage();
const upload = multer({ storage });
const doctorRouter = express.Router()

doctorRouter.post(
    "/register",
    upload.any(),
    Doctor_Register_POST
);
doctorRouter.put(
    "/profession_info",
    auth,
    Professional_PUT
);
doctorRouter.put(
    "/appointment",
    auth,
    Doctor_Appointment_PUT
);
doctorRouter.post(
    "/prescription/add",
    auth,
    controller.Prescription_POST
);
doctorRouter.put(
    "/prescription/update",
    auth,
    controller.Prescription_PUT
);
doctorRouter.put(
    "/profile/update",
    auth,
    profileUpdate
);
doctorRouter.post(
    "/availability",
    auth,
    userRole(Roles.DOCTOR),
    validateBody(addAvailabilitySchema),
    addAvailability
);
doctorRouter.post(
    "/sickNote",
    auth,
    userRole(Roles.DOCTOR),
    sickNote
);
export default doctorRouter
