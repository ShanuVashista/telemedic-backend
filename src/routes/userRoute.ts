import express from 'express';
import Login from '../controllers/user/login.controller';
import List_POST from '../controllers/user/list';
import Prescription_List_POST from '../controllers/user/prescription_list';
import patientRouter from './patient.route';
import doctorRouter from './doctor.route';
import auth from '../middlewares/auth.middleware';
const router = express.Router()
router.use('/patient', patientRouter);
router.use('/doctor', doctorRouter);
router.post("/login", Login.login);
router.post('/list', auth, List_POST);
router.post('/prescription/list', auth, Prescription_List_POST);
export default router