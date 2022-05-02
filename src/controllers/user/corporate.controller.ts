/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { differenceInMinutes, isBefore } from 'date-fns';
import { Request, Response, NextFunction } from 'express';


//getting all Appointments
const addPatient = async (req, res: Response, next: NextFunction) => {
  if (!req.files) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Please upload a profile photo"
        });
    }
    if (!req.body.confirmPassword) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Please confirm your password"
        });
    }
    if (req.body.password !== req.body.confirmPassword) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Passwords do not match"
        });
    }
  try {
    
    
    try {
        // await User.deleteMany()
        const user = await User.create({ ...req.body, role_id: Roles.PATIENT });

        // unset current_practise_address license
        user.current_practise_address = undefined;
        user.license = undefined;

        const upload_data = {
            db_response: user,
            file: req.files[0]
        }
        const image_uri = await S3.uploadFile(upload_data);
        // const response = await User.findByIdAndUpdate(user._id,{$set:{"profile_photo":image_uri.Location}},{new:true});
        // await saveFile(user, req);
        user.profile_photo = image_uri.Location;
        await user.save({ validateBeforeSave: false });

        const accesstoken = createToken(user);

        const tempArray = {}
        tempArray['oldData'] = null
        tempArray['newData'] = user
        await activityLog.create(user?._id, user?.role_id, ACTIVITY_LOG_TYPES.CREATED, req, tempArray)
        res.status(StatusCodes.CREATED).json({
            type: "success",
            status: true,
            message: "User created successfully",
            data: {
                ...user.toObject(),
                token: accesstoken,
            },
        });
    } catch (error) {
        // mongoose email exists error
        if (error.code === 11000) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                type: "error",
                status: false,
                message: "User already exists"
            });
        }
        console.log({ error });

        deleteFileByPath(req.file?.path);

        return res.status(StatusCodes.BAD_REQUEST).json({
            type: "error",
            status: false,
            message: error.message
        })
    }
}
export default register



  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

const addPhysician = async (req, res: Response, next: NextFunction) => {
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

export default {
    addPatient,
    addPhysician
};
