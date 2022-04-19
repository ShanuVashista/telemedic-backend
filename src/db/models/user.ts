/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose from 'mongoose'
import bcrypt from "bcrypt";
import validator from 'validator'
import { Roles } from '../../lib/roles';

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String, unique: true, validate: {
                validator: validator.isEmail,
                message: '{VALUE} is not a valid email'
            },
            required: true
        },

        profile_photo: { type: String, required: true },

        password: {
            type: String, required: true, minlength: 6, maxlength: 1024,
            validate: {
                validator: function (value) {
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(value)
                },
                message: '{VALUE} is not a valid password'
            },
        },

        role_id: { type: String, enum: Roles, required: true },

        firstname: { type: String, required: true, minlength: 2, maxlength: 50 },

        lastname: { type: String, required: true, minlength: 2, maxlength: 50 },

        location: { type: String },

        gender: { type: String, enum: ["male", "female", "other"], required: true },

        dob: {
            type: String, required: true, validate: {
                validator: (value) => {
                    return validator.isDate(value, {
                        format: 'YYYY/MM/DD',
                    })
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

        license: { type: Array },
        weight: { type: Number },
        height: { type: Number },
        bmi: { type: Number },
        medicalCondition: { type: String },
        pastMedicalCondition: { type: String },
        alergies: { type: String },
        medication: { type: String },
        smoking: { type: Boolean },
        alcohol: { type: Boolean },
        marijuana: { type: Boolean },
    },
    {
        timestamps: true
    }
)

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.createdAt
    delete userObject.updatedAt

    return userObject
}

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