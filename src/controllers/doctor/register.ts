/* eslint-disable no-useless-escape */
import jwt from "jsonwebtoken";
import validator from "email-validator";
import User from '../../db/models/user';
// import multer from 'multer';
// const upload = multer({ dest: 'public/' });
const Register_POST = async (req, res) => {
    try {
        //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
        const pass_rgex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const registerData = req.body;
        console.log(req, 'req----');
        if (
            registerData.email.trim() == "" ||
            registerData.email === "undefined" ||
            !validator.validate(registerData.email)
        ) {
            throw new Error("Please enter a valid email");
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
        // upload.single(req.file);
        const user = new User(registerData);
        const data = await user.save();
        const token = jwt.sign({ _id: data._id }, 'process.env.JWT_SECRET', { expiresIn: "1d" });

        res.status(201).json({
            success: true,
            message: 'Register successfully',
            accesstoken: token,
            data: data
        });
    } catch (error) {
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