import express from 'express';
var router = express.Router()
import RegisterVal from '../validator/patient';
import Register_POST from '../controllers/patient/register';
router.post(
    "/patient/register",
    RegisterVal,
    Register_POST
);
export default router
