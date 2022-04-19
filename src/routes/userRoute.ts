import express from 'express';
import Professional_PUT from '../controllers/doctor/professional';
import Doctor_Register_POST from '../controllers/doctor/register';
import { StatusCodes } from 'http-status-codes';
import multer from 'multer';
import path from 'path';
import patientloginController from '../controllers/patient/login.controller';
import register from '../controllers/patient/register.controller';
import { ensureDir } from 'fs-extra';

const router = express.Router()
const storage = multer.diskStorage({ //multers disk storage settings
    destination: async function (req, file, cb) {
        await ensureDir('./public/uploads/');
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
}).single('profile_image');

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
    register
);

router.post(
    "/doctor/register",
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
    Doctor_Register_POST
);

router.post("/login",patientloginController.login);

router.put(
    "/doctor/profession_info",
    Professional_PUT
);
export default router
