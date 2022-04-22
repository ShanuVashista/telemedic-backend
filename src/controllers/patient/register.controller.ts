import { existsSync, unlinkSync } from "fs";
import { StatusCodes } from "http-status-codes";
import User from "../../db/models/user";
import { createToken } from "../../lib/jwt";
import { Roles } from "../../lib/roles";
import { saveFile } from "../../lib/saveFile";

const register = async (req, res) => {
    if (!req.file) {
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
        const user = await User.create({ ...req.body, role_id: Roles.PATIENT, profile_photo: req.file?.filename });

        // unset current_practise_address license
        user.current_practise_address = undefined;
        user.license = undefined;

        await user.save({ validateBeforeSave: false });

        await saveFile(user, req);

        const accesstoken = createToken(user);
        res.status(StatusCodes.CREATED).json({
            message: "User created successfully asdf",
            user,
            accesstoken,
        });
    } catch (error) {
        // mongoose email exists error
        if (error.code === 11000) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "User already exists"
            });
        }
        console.log({ error });
        //if file exists
        if (await existsSync(req.file.path)) {
            unlinkSync(req.file.path);
        }
        return res.status(400).json({
            message: error.message
        })
    }
}
export default register