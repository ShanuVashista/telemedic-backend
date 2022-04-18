import validator from "email-validator";
import User from '../../db/models/user';
const Register_POST = async (req) => {
    const registerData = req;
    // return res.status(200).json({
    //     message: "Data Get Sucessful",
    //     status: true,
    //     result: req.body
    // });
    if (
        registerData.email.trim() == "" ||
        registerData.email === "undefined" ||
        !validator.validate(registerData.email)
    ) {
        return (
            {
                message: "Please enter a valid email",
                statuscode: 400,
            }
        );
    }
    const userdetails = await User.findOne(
        {
            email: registerData.email,
        })
    console.log(userdetails, 'userdetails---');

    if (userdetails != null) {
        return (
            {
                message: "Email already exist",
                statuscode: 400,
            }
        );
    }
    if (registerData.password != registerData.confirmPassword) {
        return (
            {
                message: "Confirm password does't match",
                statuscode: 400,
            }
        );
    }
    const user = new User(registerData);
    const data = await user.save();
    if (!data) {
        return (data);
    } else {
        return ({ message: 'Register successfully', data: data,
        statuscode: 201, });
    }
}
export default Register_POST