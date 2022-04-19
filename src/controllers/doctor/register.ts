import jwt from "jsonwebtoken";
import validator from "email-validator";
import User from '../../db/models/user';
const Register_POST = async (req,res) => {
    const registerData = req.body;
    try {
        if (
            registerData.email.trim() == "" ||
            registerData.email === "undefined" ||
            !validator.validate(registerData.email)
        ) {
            throw new Error ("Please enter a valid email");
        }
        if (
            registerData.password != registerData.confirmPassword
        ) {
            throw new Error ("Confirm Password does't match");
        }
        const user = new User(registerData);
        const data = await user.save();        
        const token = jwt.sign({_id: data._id}, 'process.env.JWT_SECRET', {expiresIn: "1d"});

        res.status(201).json({
            success: true,
            accesstoken: token,
            data: data
        });
    } catch (error){
            res.status(400).json({
                success: false,
                message: error.message
            });
    }
}
export default Register_POST