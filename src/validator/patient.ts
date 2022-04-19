import { body } from 'express-validator'
const RegisterVal = [
    body('email').isEmail().withMessage('Email not valid'),
    body('type').not().isEmpty().withMessage('User type should not be empty'),
    body('password').isLength({ min: 4, max: 18 }).trim().withMessage('Password must have greater then 4 and less then 18 chars long'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true
    })
]
export = RegisterVal