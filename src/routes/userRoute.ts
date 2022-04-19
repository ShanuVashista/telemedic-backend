import express from 'express';
import Doctor_Register_POST from '../controllers/doctor/register';
import { StatusCodes } from 'http-status-codes';
import multer from 'multer';
import path from 'path';
import patientController from '../controllers/patient/patient.controller';

const router = express.Router()
const storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        const datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});
const upload = multer({
    storage,
    fileFilter: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
}).single('file');

router.post(
    "/patient/register",
    function (req, res, next) {
        upload(req, res, function (err) {
            if (err) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: err.message
                });
            }
            next();
        })
    },
    patientController.register
);
router.post(
    "/doctor/register",
    Doctor_Register_POST
);
export default router
