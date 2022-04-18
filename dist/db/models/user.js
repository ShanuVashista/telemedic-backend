"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
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
    current_practise_address: { type: Object },
    license: { type: Array }
}, {
    timestamps: true
});
module.exports = mongoose_1.default.model("user", userSchema);
//# sourceMappingURL=user.js.map