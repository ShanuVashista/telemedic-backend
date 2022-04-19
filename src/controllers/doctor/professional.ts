// import jwt from "jsonwebtoken";
// import validator from "email-validator";
import User from '../../db/models/user';
// import multer from 'multer';
// const upload = multer({ dest: 'public/' });
const Professional_PUT = async (req, res) => {
    try {
        const registerData = req.body;
        const checkForHexRegExp = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
        let cond = {};
        if (typeof (req.query.id) == 'undefined' || req.query.id == null) {
            throw new Error('Missing doctor id');
        } else {
            if (!checkForHexRegExp.test(req.query['id'] as string)) {
                throw new Error('Faild to match required pattern for Doctor Id');
            } else {
                cond = { '_id': req.query.id }
            }
        }
        if (!registerData.specialty) {
            throw new Error("Please enter a specialty");
        }
        if (!registerData.qualification) {
            throw new Error("Please enter your qualification");
        }
        if (!registerData.total_exp) {
            throw new Error("Please enter your total experience");
        }
        if (!registerData.current_practise_address) {
            throw new Error("Please enter your current practise address");
        } else {
            if (registerData.current_practise_address.length == 0) {
                throw new Error("Please enter your current practise address");
            }
        }
        if (!registerData.license) {
            throw new Error("Please enter your license details");
        } else {
            if (registerData.license.length == 0) {
                throw new Error("Please enter your license details");
            }
        }
        const user_count = await User.find(cond).count();
        if (user_count == 0) {
            throw new Error("Doctor does't exist");
        }
        const user = await User.findByIdAndUpdate(cond, registerData, { new: true });

        res.status(200).json({
            success: true,
            message: 'Successfully submitted professional info',
            data: user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}
export default Professional_PUT