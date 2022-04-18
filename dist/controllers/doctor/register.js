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
const email_validator_1 = __importDefault(require("email-validator"));
const user_1 = __importDefault(require("../../db/models/user"));
const Register_POST = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const registerData = req;
    // return res.status(200).json({
    //     message: "Data Get Sucessful",
    //     status: true,
    //     result: req.body
    // });
    if (registerData.email.trim() == "" ||
        registerData.email === "undefined" ||
        !email_validator_1.default.validate(registerData.email)) {
        return ({
            message: "Please enter a valid email",
            statuscode: 400,
        });
    }
    const userdetails = yield user_1.default.findOne({
        email: registerData.email,
    });
    console.log(userdetails, 'userdetails---');
    if (userdetails != null) {
        return ({
            message: "Email already exist",
            statuscode: 400,
        });
    }
    if (registerData.password != registerData.confirmPassword) {
        return ({
            message: "Confirm password does't match",
            statuscode: 400,
        });
    }
    const user = new user_1.default(registerData);
    const data = yield user.save();
    if (!data) {
        return (data);
    }
    else {
        return ({ message: 'Register successfully', data: data,
            statuscode: 201, });
    }
});
exports.default = Register_POST;
//# sourceMappingURL=register.js.map