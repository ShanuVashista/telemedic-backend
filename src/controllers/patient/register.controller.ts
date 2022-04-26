import { StatusCodes } from "http-status-codes";
import User from "../../db/models/user";
import { createToken } from "../../lib/jwt";
import { Roles } from "../../lib/roles";
// import { saveFile } from "../../lib/saveFile";
import { deleteFileByPath } from "../../lib/deleteFileByPath";
import uploadFile from '../../services/upload';
const register = async (req, res) => {
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
        // await User.deleteMany()
        const user = await User.create({ ...req.body, role_id: Roles.PATIENT });

        // unset current_practise_address license
        user.current_practise_address = undefined;
        user.license = undefined;

        const upload_data = {
            db_response: user,
            file: req.files[0]
        }
        const image_uri = await uploadFile(upload_data);
        // const response = await User.findByIdAndUpdate(user._id,{$set:{"profile_photo":image_uri.Location}},{new:true});
        // await saveFile(user, req);
        user.profile_photo = image_uri.Location;
        await user.save({ validateBeforeSave: false });

        const accesstoken = createToken(user);
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


