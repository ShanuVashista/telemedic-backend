import express from 'express';
import Login from '../controllers/user/login.controller';
import List_POST from '../controllers/user/list';
import patientRouter from './patient.route';
import auth from '../middlewares/auth.middleware';
const router = express.Router()
router.use('/patient', patientRouter);
router.use('/doctor', patientRouter);
router.post("/login", Login.login);
router.post('/list', auth, List_POST)
export default router