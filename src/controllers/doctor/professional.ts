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
        if (typeof (req.query.id) != 'undefined' && req.query.id != null) {
            if (!checkForHexRegExp.test(req.query['id'] as string)) {
                throw new Error('Faild to match required pattern for Doctor Id');
            } else {
                cond = { '_id': req.query.id }
            }
        }
        const user_count = await User.find(cond).count();
        if(user_count == 0){
            throw new Error("Doctor does't exist");
        }
        const user = await User.findByIdAndUpdate(cond,registerData,{new:true});

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