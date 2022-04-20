import express from 'express';
import uploadFile from '../middlewares/fileUpload.middleware';
import Doctor_Register_POST from '../controllers/doctor/register';
import Professional_PUT from '../controllers/doctor/professional';
import Doctor_Appointment_PUT from '../controllers/doctor/appointment_update';
import auth from '../middlewares/auth.middleware';
const doctorRouter = express.Router()

doctorRouter.post(
    "/register",
    uploadFile,
    Doctor_Register_POST
);
doctorRouter.put(
    "/profession_info",
    Professional_PUT
);
doctorRouter.put(
    "/appointment",
    auth,
    Doctor_Appointment_PUT
);
export default doctorRouter
