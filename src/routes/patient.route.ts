import express from 'express';
import register from '../controllers/patient/register.controller';
import healthData from '../controllers/patient/healthData.controller';
import { healthDataSchema } from '../validator/patient';
import { validateJoi } from '../middlewares/joi.middleware';
import uploadFile from '../middlewares/fileUpload.middleware';

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

export default patientRouter
