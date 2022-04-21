import express from 'express';
import Login from '../controllers/user/login.controller';
import List_POST from '../controllers/user/list';
import patientRouter from './patient.route';
import doctorRouter from './doctor.route';
import auth from '../middlewares/auth.middleware';
import notificationRouter from './notification.route';
const router = express.Router()
router.use('/patient', patientRouter);
router.use('/doctor', doctorRouter);
router.post("/login", Login.login);
router.post('/list', auth, List_POST)
router.use('/notifications', auth, notificationRouter)
export default router