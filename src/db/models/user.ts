/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose from 'mongoose'
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
    {
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

    },
    {
        timestamps: true
    }
)
userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return next();

    bcrypt.hash(user.password, 10, function (err, hash) {
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

    return bcrypt.compareSync(password, user.password);
};
const User = mongoose.model("user", userSchema);
export default User;