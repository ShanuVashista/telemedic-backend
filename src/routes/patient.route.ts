import express from 'express';
import register from '../controllers/patient/register.controller';
import healthData from '../controllers/patient/healthData.controller';
import {
    healthProfileSchema,
    healthDataSchema,
    healthProfileUpdateSchema,
} from '../validator/patient';
import { validateBody, validateParams, validateQuery } from '../middlewares/joi.middleware';
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
import Prescription_Renewal_PUT from '../controllers/patient/prescription';
import { healthProfileQuerySchema } from '../validator/healthProfile';
import { pathParamIdSchema } from '../validator/util';
import { paymentMethod } from '../validator/paymentMethods.validation';
import { getPaymentMethod, savePaymentMethod } from '../controllers/patient/paymentMethod.controller';
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({storage});
const patientRouter = express.Router();

patientRouter.post('/register', upload.any(), register);

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
    upload.any(),
    validateBody(healthProfileSchema),
    addHealthProfile
);

patientRouter.put(
    '/healthProfiles/:id',
    auth,
    userRole(Roles.PATIENT),
    upload.any(),
    validateParams(pathParamIdSchema),
    validateBody(healthProfileUpdateSchema),
    updateHealthProfile
);

patientRouter.get(
    '/healthProfiles',
    auth,
    userRole(Roles.PATIENT),
    validateQuery(healthProfileQuerySchema),
    listHealthProfile
);

patientRouter.get(
    '/healthProfiles/:id',
    auth,
    userRole(Roles.PATIENT),
    validateParams(pathParamIdSchema),
    getHealthProfile
);

patientRouter.delete(
    '/healthProfiles/:id',
    auth,
    userRole(Roles.PATIENT),
    validateParams(pathParamIdSchema),
    deleteHealthProfile
);
patientRouter.put(
    '/prescription/update',
    auth,
    Prescription_Renewal_PUT
);

patientRouter.post(
    '/paymentMethods',
    auth,
    userRole(Roles.PATIENT),
    validateBody(paymentMethod),
    savePaymentMethod
);

patientRouter.get(
    '/paymentMethods',
    auth,
    userRole(Roles.PATIENT),
    getPaymentMethod
);
export default patientRouter;
