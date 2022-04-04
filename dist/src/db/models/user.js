var mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    image: String,
    password: String,
    type: { type: String, enum: ["patient", "doctor"], required: true }
}, {
    timestamps: true
});
module.exports = mongoose.model("user", userSchema);
//# sourceMappingURL=user.js.map