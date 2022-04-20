import express from 'express';
import uploadFile from '../middlewares/fileUpload.middleware';
import Doctor_Register_POST from '../controllers/doctor/register';
import Professional_PUT from '../controllers/doctor/professional';
const doctorRouter = express.Router()

doctorRouter.post(
    "/doctor/register",
    uploadFile,
    Doctor_Register_POST
);
doctorRouter.put(
    "/doctor/profession_info",
    Professional_PUT
);
export default doctorRouter
