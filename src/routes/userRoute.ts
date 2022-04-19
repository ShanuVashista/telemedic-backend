import express from 'express';
const router = express.Router()
import PatientRegisterVal from '../validator/patient';
// import DoctorRegisterVal from '../validator/doctor';
import Patient_Register_POST from '../controllers/patient/register';
import Doctor_Register_POST from '../controllers/doctor/register';
import Professional_PUT from '../controllers/doctor/professional';
router.post(
    "/patient/register",
    PatientRegisterVal,
    Patient_Register_POST
);
router.post(
  "/doctor/register",
  Doctor_Register_POST
);
router.put(
  "/doctor/profession_info",
  Professional_PUT
);
// router.post("/doctor/register", async function (req, res) {
//     const registerData = req.body;
//     const response = await Doctor_Register_POST(registerData);
//     const statuscode = response.statuscode;
//     delete response.statuscode;
//     res.status(statuscode).send(response);
//   });
export default router
