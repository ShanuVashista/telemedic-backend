/* eslint-disable no-useless-escape */
import { existsSync, fstat, mkdirSync, renameSync, unlinkSync } from "fs";
import jwt from "jsonwebtoken";
import validator from "email-validator";
import StatusCodes from "http-status-codes";
import User from '../../db/models/user';
import { Roles } from "../../lib/roles";
const Register_POST = async (req, res) => {
    try {
        //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
        const pass_rgex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const registerData = req.body;
        console.log(req, 'req----');
        if (!req.file) {
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
            throw new Error("Confirm Password does't match");
        }
        if (!registerData.phone) {
            throw new Error("Please enter a Phone Number");
        }
        if (!registerData.fax) {
            throw new Error("Please enter a Fax");
        }
        const user = new User({ ...req.body, profile_photo: req.file.filename, role_id: Roles.DOCTOR });
        const data = await user.save();
        // check if folder exists
        if (! await existsSync(`./public/uploads/${data._id}`)) {
            // create a folder in public/uploads named by user id
            await mkdirSync(`./public/uploads/${data._id}`);
        }
        // move the file to the folder
        await renameSync(`./public/uploads/${req.file.filename}`, `./public/uploads/${data._id}/${req.file.filename}`);
        const token = jwt.sign({ _id: data._id }, 'process.env.JWT_SECRET', { expiresIn: "1d" });

        res.status(201).json({
            success: true,
            message: 'Register successfully',
            accesstoken: token,
            data: data
        });
    } catch (error) {
        unlinkSync(req.file.path);
        if (error.code == 11000) {
            res.status(400).json({
                success: false,
                message: "Email Already exist"
            });
        } else {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}
export default Register_POST