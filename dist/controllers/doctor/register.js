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
const fs_1 = require("fs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const email_validator_1 = __importDefault(require("email-validator"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_1 = __importDefault(require("../../db/models/user"));
const roles_1 = require("../../lib/roles");
const Register_POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
        const pass_rgex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const registerData = req.body;
        console.log(req, 'req----');
        if (!req.file) {
            return res.status(http_status_codes_1.default.BAD_REQUEST).json({
                message: "Please upload a profile photo"
            });
        }
        if (!registerData.email) {
            throw new Error("Please enter a your email");
        }
        else {
            if (!email_validator_1.default.validate(registerData.email)) {
                throw new Error("Please enter a valid email");
            }
            else {
                const user_count = yield user_1.default.find({ 'email': registerData.email });
                if (user_count.length != 0 && user_count[0].role_id == 'doctor') {
                    throw new Error("Doctor already exist");
                }
                else {
                    if (user_count.length != 0 && user_count[0].role_id != 'doctor') {
                        throw new Error("This Email is already assiociate with us");
                    }
                }
            }
        }
        if (!pass_rgex.test(registerData.password)) {
            throw new Error("Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character");
        }
        if (registerData.password != registerData.confirmPassword) {
            throw new Error("Confirm Password dosen't match");
        }
        if (!registerData.phone) {
            throw new Error("Please enter a Phone Number");
        }
        if (!registerData.fax) {
            throw new Error("Please enter a Fax");
        }
        const user = new user_1.default(Object.assign(Object.assign({}, req.body), { profile_photo: req.file.filename, role_id: roles_1.Roles.DOCTOR }));
        const data = yield user.save();
        // check if folder exists
        if (!(yield (0, fs_1.existsSync)(`./public/uploads/${data._id}`))) {
            // create a folder in public/uploads named by user id
            yield (0, fs_1.mkdirSync)(`./public/uploads/${data._id}`);
        }
        // move the file to the folder
        yield (0, fs_1.renameSync)(`./public/uploads/${req.file.filename}`, `./public/uploads/${data._id}/${req.file.filename}`);
        const token = jsonwebtoken_1.default.sign({ _id: data._id }, 'process.env.JWT_SECRET', { expiresIn: "1d" });
        res.status(201).json({
            success: true,
            message: 'Register successfully',
            accesstoken: token,
            data: data
        });
    }
    catch (error) {
        (0, fs_1.unlinkSync)(req.file.path);
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