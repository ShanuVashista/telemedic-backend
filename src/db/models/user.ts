/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { Roles } from '../../lib/roles';

enum GenderEnum {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}

interface card {
    card_number: string;
    card_name: string;
    card_expiry: string;
    card_cvv: string;
    type: string;
}

interface bank {
    bank_name: string;
    account_number: string;
    account_name: string;
    account_type: string;
    ifsc_code: string;
    type: string;
}
export interface IUser {
    email: string;
    profile_photo: string;
    password: string;
    role_id: Roles;
    firstname: string;
    lastname: string;
    location?: string;
    gender: GenderEnum;
    dob: string;
    phone?: number;
    fax?: number;
    specialty?: string;
    qualification?: string;
    total_exp?: string;
    current_practise_address?: Array<unknown>;
    license?: Array<unknown>;
    weight?: number;
    height?: number;
    bmi?: number;
    medicalCondition?: string;
    pastMedicalCondition?: string;
    alergies?: string;
    medication?: string;
    smoking?: boolean;
    alcohol?: boolean;
    marijuana?: boolean;
    payment_method?: {
        card?: card;
        bank?: bank;
    };
}

const userSchema = new mongoose.Schema<IUser>(
    {
        email: {
            type: String,
            unique: true,
            validate: {
                validator: validator.isEmail,
                message: '{VALUE} is not a valid email',
            },
            required: true,
        },

        profile_photo: { type: String },

        password: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 1024,
            validate: {
                validator: function (value) {
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
                        value
                    );
                },
                message: '{VALUE} is not a valid password',
            },
        },

        role_id: { type: String, enum: Roles, required: true },

        firstname: { type: String, required: true, minlength: 2, maxlength: 50 },

        lastname: { type: String, required: true, minlength: 2, maxlength: 50 },

        location: { type: String },

        gender: { type: String, enum: GenderEnum, required: true },

        dob: {
            type: String,
            required: true,
            validate: {
                validator: (value) => {
                    return validator.isDate(value, {
                        format: 'YYYY/MM/DD',
                    });
                },
                message: '{VALUE} is not a valid date',
            },
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
        payment_method: { type: Object, get: obfuscatePaymentMethod },
    },
    {
        timestamps: true,
    }
);

// userSchema.methods.toJSON = function (this: mongoose.HydratedDocument<IUser>) {
//     const user = this;

//     const userObject = user.toObject();

//     userObject.profile_photo = `/uploads/${user._id}/${user.profile_photo}`;

//     delete userObject.password;

//     return userObject;
// };

userSchema.pre('save', function (this: mongoose.HydratedDocument<IUser>, next) {
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });

    user.email = user.email.toLowerCase();
});

userSchema.methods.comparePassword = function (
    this: mongoose.HydratedDocument<IUser>,
    password
) {
    const user = this;

    return bcrypt.compareSync(password, user.password);
};
const User = mongoose.model('user', userSchema);
export default User;

function obfuscatePaymentMethod(payment_method: IUser['payment_method']) {
    if (!payment_method) return;

    if (payment_method.card) {
        payment_method.card.card_number = `XXXX-XXXX-XXXX-${payment_method.card.card_number.slice(
            -4
        )}`;
    }

    if (payment_method.bank) {
        payment_method.bank.account_number = `XXXX-XXXX-XXXX-${payment_method.bank.account_number.slice(
            -4
        )}`;
    }

    return payment_method;
}
