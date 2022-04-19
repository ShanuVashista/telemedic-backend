"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-useless-escape */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const email_validator_1 = __importDefault(require("email-validator"));
const user_1 = __importDefault(require("../../db/models/user"));
// import multer from 'multer';
// const upload = multer({ dest: 'public/' });
const Register_POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
        const pass_rgex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const registerData = req.body;
        console.log(req, 'req----');
        if (registerData.email.trim() == "" ||
            registerData.email === "undefined" ||
            !email_validator_1.default.validate(registerData.email)) {
            throw new Error("Please enter a valid email");
        }
        if (!pass_rgex.test(registerData.password)) {
            throw new Error("Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character");
        }
        if (registerData.password != registerData.confirmPassword) {
            throw new Error("Confirm Password does't match");
        }
        // upload.single(req.file);
        const user = new user_1.default(registerData);
        const data = yield user.save();
        const token = jsonwebtoken_1.default.sign({ _id: data._id }, 'process.env.JWT_SECRET', { expiresIn: "1d" });
        res.status(201).json({
            success: true,
            message: 'Register successfully',
            accesstoken: token,
            data: data
        });
    }
    catch (error) {
        if (error.code == 11000) {
            res.status(400).json({
                success: false,
                message: "Email Already exist"
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
});
exports.default = Register_POST;
//# sourceMappingURL=register.js.map