"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthDataSchema = exports.RegisterVal = void 0;
const express_validator_1 = require("express-validator");
const joi_1 = __importDefault(require("joi"));
exports.RegisterVal = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Email not valid'),
    (0, express_validator_1.body)('type').not().isEmpty().withMessage('User type should not be empty'),
    (0, express_validator_1.body)('password').isLength({ min: 4, max: 18 }).trim().withMessage('Password must have greater then 4 and less then 18 chars long'),
    (0, express_validator_1.body)('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    })
];
exports.healthDataSchema = joi_1.default.object().options({
    abortEarly: false,
    allowUnknown: false
}).keys({
    weight: joi_1.default.number(),
    height: joi_1.default.number(),
    bmi: joi_1.default.number(),
    medicalCondition: joi_1.default.string(),
    pastMedicalCondition: joi_1.default.string(),
    alergies: joi_1.default.string(),
    medication: joi_1.default.string(),
    smoking: joi_1.default.boolean(),
    alcohol: joi_1.default.boolean(),
    marijuana: joi_1.default.boolean(),
});
//# sourceMappingURL=patient.js.map