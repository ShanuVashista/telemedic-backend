"use strict";
const express_validator_1 = require("express-validator");
const RegisterVal = [
    (0, express_validator_1.body)('email').not().isEmail().withMessage('Email not valid'),
    (0, express_validator_1.body)('type').not().isEmpty().withMessage('User type should not be empty'),
    (0, express_validator_1.body)('password').not().isLength({ min: 4, max: 18 }).trim().withMessage('Password must have greater then 4 and less then 18 chars long'),
    (0, express_validator_1.body)('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    })
];
module.exports = RegisterVal;
//# sourceMappingURL=patient.js.map