import express from 'express';
import uploadFile from '../middlewares/fileUpload.middleware';
import Doctor_Register_POST from '../controllers/doctor/register';
import Professional_PUT from '../controllers/doctor/professional';
import Doctor_Appointment_PUT from '../controllers/doctor/appointment_update';
import auth from '../middlewares/auth.middleware';
import controller from '../controllers/doctor/prescription.controller';
const doctorRouter = express.Router()

doctorRouter.post(
    "/register",
    uploadFile,
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
export default doctorRouter
