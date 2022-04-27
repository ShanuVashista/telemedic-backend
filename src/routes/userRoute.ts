import express from 'express';
import Login from '../controllers/user/login.controller';
import Passwordcontroller from '../controllers/user/Password.controller';
import List_POST from '../controllers/user/list';
import Prescription_List_POST from '../controllers/user/prescription_list';
import patientRouter from './patient.route';
import doctorRouter from './doctor.route';
import auth from '../middlewares/auth.middleware';
import notificationRouter from './notification.route';
import transactionRouter from './transaction.route';
import userRole from '../middlewares/userRole.middleware';
import { Roles } from '../lib/roles';
import { updateAdmin } from '../controllers/siteAdmin/update.controller';
import { validateBody } from '../middlewares/joi.middleware';
import { adminUpdateSchema } from '../validator/admin.validation';

const router = express.Router()
router.use('/patient', patientRouter);
router.use('/doctor', doctorRouter);
router.post("/login", Login.login);
router.post("/admin/login", Login.admin);
router.put("/admin", auth, userRole(Roles.ADMIN), validateBody(adminUpdateSchema), updateAdmin);
router.post("/forgotPass", Passwordcontroller.forgotPassword)
router.post("/password-reset/:userId/:token", Passwordcontroller.resetPassword)
router.post("/password-change", auth, Passwordcontroller.changePassword)
router.post('/list', auth, List_POST);
router.post('/prescription/list', auth, Prescription_List_POST);
router.use('/notifications', auth, notificationRouter)
router.use('/transactions', auth, transactionRouter)
export default router