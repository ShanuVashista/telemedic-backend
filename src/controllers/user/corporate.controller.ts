/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { differenceInMinutes, isBefore } from 'date-fns';
import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import validator from "email-validator";
import StatusCodes from "http-status-codes";
import User from '../../db/models/user';
import { Roles } from "../../lib/roles";
import S3 from '../../services/upload';
import activityLog from "../../services/activityLog"
import { ACTIVITY_LOG_TYPES } from "../../../constant";


const addPatient = async (req, res: Response, next: NextFunction) => {
  try {

    return res.status(200).json({
      status: true,
      type: 'success',
      message: 'Appointment Fetch Successfully',
      //   page: page,
      //   limit: limit,
      //   totalPages: totalPages,
      //   total: result_count,
      //   data: result,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

const addPhysician = async (req, res: Response, next: NextFunction) => {
  try {
    //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
    const pass_rgex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const registerData = req.body;
    // console.log(req, 'req----');
    if (!req.files) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please upload a profile photo"
      });
    }
    if (
      !registerData.email
    ) {
      throw new Error("Please enter a your email");
    } else {
      if (!validator.validate(registerData.email)) {
        throw new Error("Please enter a valid email");

      } else {
        const user_count = await User.find({ 'email': registerData.email });
        if (user_count.length != 0 && user_count[0].role_id == 'doctor') {
          throw new Error("Doctor already exist");
        } else {
          if (user_count.length != 0 && user_count[0].role_id != 'doctor') {
            throw new Error("This Email is already assiociate with us");
          }
        }
      }
    }
    if (
      !pass_rgex.test(registerData.password)
    ) {
      throw new Error("Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character");
    }
    if (
      registerData.password != registerData.confirmPassword
    ) {
      throw new Error("Confirm Password dosen't match");
    }
    if (!registerData.phone) {
      throw new Error("Please enter a Phone Number");
    }
    // if (!registerData.fax) {
    //     throw new Error("Please enter a Fax");
    // }
    req.body.isCorporate = true;
    const user = new User({ ...req.body, role_id: Roles.DOCTOR });
    let data = await user.save();
    const tempArray = {}
    tempArray['oldData'] = null
    tempArray['newData'] = data
    const activityData = await activityLog.create(data._id, data.role_id, ACTIVITY_LOG_TYPES.CREATED, req, tempArray)


    data = JSON.parse(JSON.stringify(data));
    const upload_data = {
      db_response: data,
      file: req.files[0]
    }
    const image_uri = await S3.uploadFile(upload_data);

    const response = await User.findByIdAndUpdate(data._id, { $set: { "profile_photo": image_uri.Location } }, { new: true });
    const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(201).json({
      status: true,
      type: 'success',
      message: 'Doctor Registration Successfully',
      data: {
        ...response.toObject(),
        token: token,
      }
    });
  } catch (error) {
    if (error.code == 11000) {
      res.status(400).json({
        status: false,
        type: 'error',
        message: "Email Already exist"
      });
    } else {
      res.status(400).json({
        status: false,
        type: 'error',
        message: error.message
      });
    }
  }
};

export default {
  addPatient,
  addPhysician
};
