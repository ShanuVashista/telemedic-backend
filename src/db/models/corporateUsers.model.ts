import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import {Roles} from "../../lib/roles";

enum GenderEnum{
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}

enum DoctorStatus {
    ENABLE = 'enable',
    DISABLE = 'disable',
}

export interface ICorporateUser {
    email:string;
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
    specialty:string;
    qualification?:string;
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
    status?: string;
    isApproved?: boolean;
    isProfessionalInfo?: boolean;
    isBankDetails?: boolean;
    isAvailability?: boolean;
}

const corporateUserSchema = new mongoose.Schema<ICorporateUser>(
    {
        email: {
            type: String,
            unique: true,
            validate: {
                validator: validator.isEmail,
                message: 'Email is not a valid email',
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

        current_practise_address: {
            type: Array,
            default: defaultByRole({
                [Roles.DOCTOR: [],
            }),
        },
    }
)