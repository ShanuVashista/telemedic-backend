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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const email_validator_1 = __importDefault(require("email-validator"));
const user_1 = __importDefault(require("../../db/models/user"));
const Register_POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const registerData = req.body;
    try {
        if (registerData.email.trim() == "" ||
            registerData.email === "undefined" ||
            !email_validator_1.default.validate(registerData.email)) {
            throw new Error("Please enter a valid email");
        }
        if (registerData.password != registerData.confirmPassword) {
            throw new Error("Confirm Password does't match");
        }
        const user = new user_1.default(registerData);
        const data = yield user.save();
        const token = jsonwebtoken_1.default.sign({ _id: data._id }, 'process.env.JWT_SECRET', { expiresIn: "1d" });
        res.status(201).json({
            success: true,
            accesstoken: token,
            data: data
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.default = Register_POST;
//# sourceMappingURL=register.js.map