import express from 'express';
import register from '../controllers/patient/register.controller';
import healthData from '../controllers/patient/healthData.controller';
import { healthProfileSchema, healthDataSchema } from '../validator/patient';
import { validateJoi } from '../middlewares/joi.middleware';
import uploadFile from '../middlewares/fileUpload.middleware';
import auth from '../middlewares/auth.middleware';
import addHealthProfile from '../controllers/patient/addHealthProfile.controller';

const patientRouter = express.Router()

patientRouter.post(
    "/register",
    uploadFile,
    register
);

patientRouter.put(
    "/healthData",
    validateJoi(healthDataSchema),
    healthData
);

patientRouter.post(
    "/healthProfile",
    auth,
    validateJoi(healthProfileSchema),
    addHealthProfile
);
export default patientRouter
