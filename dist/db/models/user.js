"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, unique: true },
    profile_photo: { type: String },
    password: { type: String },
    role_id: { type: String, enum: ["patient", "doctor"], required: true },
    firstname: { type: String },
    lastname: { type: String },
    gender: { type: String },
    dob: { type: String },
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