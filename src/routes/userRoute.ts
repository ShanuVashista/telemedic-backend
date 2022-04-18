import express from 'express';
const router = express.Router()
import PatientRegisterVal from '../validator/patient';
import DoctorRegisterVal from '../validator/patient';
import Patient_Register_POST from '../controllers/patient/register';
import Doctor_Register_POST from '../controllers/doctor/register';
router.post(
    "/patient/register",
    PatientRegisterVal,
    Patient_Register_POST
);
router.post(
    "/doctor/register",
    DoctorRegisterVal,
    Doctor_Register_POST
);
export default router
