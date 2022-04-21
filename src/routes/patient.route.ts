import express from 'express';
import register from '../controllers/patient/register.controller';
import healthData from '../controllers/patient/healthData.controller';
import {
    healthProfileSchema,
    healthDataSchema,
    healthProfileUpdateSchema,
} from '../validator/patient';
import { validateBody, validateQuery } from '../middlewares/joi.middleware';
import uploadFile from '../middlewares/fileUpload.middleware';
import auth from '../middlewares/auth.middleware';
import {
    addHealthProfile,
    deleteHealthProfile,
    getHealthProfile,
    listHealthProfile,
    updateHealthProfile,
} from '../controllers/patient/healthProfile';
import { Roles } from '../lib/roles';
import userRole from '../middlewares/userRole.middleware';
import { paginationQuerySchema } from '../validator/util';
import Prescription_Renewal_PUT from '../controllers/patient/prescription';
const patientRouter = express.Router();

patientRouter.post('/register', uploadFile, register);

patientRouter.put(
    '/healthData',
    auth,
    userRole(Roles.PATIENT),
    validateBody(healthDataSchema),
    healthData
);

patientRouter.post(
    '/healthProfiles',
    auth,
    userRole(Roles.PATIENT),
    validateBody(healthProfileSchema),
    addHealthProfile
);

patientRouter.put(
    '/healthProfiles/:id',
    auth,
    userRole(Roles.PATIENT),
    validateBody(healthProfileUpdateSchema),
    updateHealthProfile
);

patientRouter.get(
    '/healthProfiles',
    auth,
    userRole(Roles.PATIENT),
    validateQuery(paginationQuerySchema),
    listHealthProfile
);

patientRouter.get(
    '/healthProfiles/:id',
    auth,
    userRole(Roles.PATIENT),
    getHealthProfile
);

patientRouter.delete(
    '/healthProfiles/:id',
    auth,
    userRole(Roles.PATIENT),
    deleteHealthProfile
);
patientRouter.put(
    '/prescription/update',
    auth,
    Prescription_Renewal_PUT
);
export default patientRouter;
