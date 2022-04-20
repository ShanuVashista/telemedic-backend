import express from 'express';
import register from '../controllers/patient/register.controller';
import healthData from '../controllers/patient/healthData.controller';
import {
    healthProfileSchema,
    healthDataSchema,
    healthProfileUpdateSchema,
} from '../validator/patient';
import { validateJoi } from '../middlewares/joi.middleware';
import uploadFile from '../middlewares/fileUpload.middleware';
import auth from '../middlewares/auth.middleware';
import {
    addHealthProfile,
    deleteHealthProfile,
    getHealthProfile,
    listHealthProfile,
    updateHealthProfile,
} from '../controllers/patient/healthProfile';

const patientRouter = express.Router();

patientRouter.post('/register', uploadFile, register);

patientRouter.put('/healthData', validateJoi(healthDataSchema), healthData);

patientRouter.post(
    '/healthProfiles',
    auth,
    validateJoi(healthProfileSchema),
    addHealthProfile
);

patientRouter.put(
    '/healthProfiles/:id',
    auth,
    validateJoi(healthProfileUpdateSchema),
    updateHealthProfile
);

patientRouter.get('/healthProfiles', auth, listHealthProfile);

patientRouter.get('/healthProfiles/:id', auth, getHealthProfile);

patientRouter.delete('/healthProfiles/:id', auth, deleteHealthProfile);

export default patientRouter;