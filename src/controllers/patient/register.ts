import {validationResult, matchedData } from 'express-validator'
const Register_POST = async (req, res) => {
    const errors = validationResult(req);
    console.log(errors,'-----');
    
    const user = matchedData(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({
            message: errors.array()[0].msg,
            status: false,
            result: user
        });
    } else {
        return res.status(200).json({
            message: "Data Get Sucessful",
            status: true,
            result: req.body
        });
    }
}
export default Register_POST