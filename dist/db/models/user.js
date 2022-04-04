"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, unique: true },
    image: String,
    password: String,
    type: { type: String, enum: ["patient", "doctor"], required: true }
}, {
    timestamps: true
});
module.exports = mongoose_1.default.model("user", userSchema);
//# sourceMappingURL=user.js.map