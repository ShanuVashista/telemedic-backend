"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String, unique: true, validate: {
            validator: validator_1.default.isEmail,
            message: '{VALUE} is not a valid email'
        },
        required: true
    },
    profile_photo: { type: String, required: true },
    password: {
        type: String, required: true, minlength: 6, maxlength: 1024,
        validate: {
            validator: function (value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(value);
            },
            message: '{VALUE} is not a valid password'
        },
    },
    role_id: { type: String, enum: ["patient", "doctor"], required: true },
    firstname: { type: String, required: true, minlength: 2, maxlength: 50 },
    lastname: { type: String, required: true, minlength: 2, maxlength: 50 },
    location: { type: String },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    dob: {
        type: String, required: true, validate: {
            validator: (value) => {
                return validator_1.default.isDate(value, {
                    format: 'YYYY/MM/DD',
                });
            },
            message: '{VALUE} is not a valid date'
        }
    },
    phone: { type: Number },
    fax: { type: Number },
    specialty: { type: String },
    qualification: { type: String },
    total_exp: { type: String },
    current_practise_address: { type: Array },
    license: { type: Array }
}, {
    timestamps: true
});
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.createdAt;
    delete userObject.updatedAt;
    return userObject;
};
userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password"))
        return next();
    bcrypt_1.default.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
    user.email = user.email.toLowerCase();
});
userSchema.methods.comparePassword = function (password) {
    const user = this;
    return bcrypt_1.default.compareSync(password, user.password);
};
const User = mongoose_1.default.model("user", userSchema);
exports.default = User;
//# sourceMappingURL=user.js.map