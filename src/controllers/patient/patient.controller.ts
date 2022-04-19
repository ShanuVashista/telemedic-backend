import { unlinkSync } from "fs";
import { StatusCodes } from "http-status-codes";
import User from "../../db/models/user";

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
        const user = await User.create({ ...req.body, profile_photo: req.file.filename });
        console.log({ user });
        console.log({ file: req.file })
        res.status(StatusCodes.CREATED).json({
            message: "User created successfully",
            user
        });
    } catch (error) {
        // mongoose email exists error
        if (error.code === 11000) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "User already exists"
            });
        }
        console.log({ error });
        unlinkSync(req.file.path);
        return res.status(400).json({
            message: error.message
        })
    }
}
export default { register }