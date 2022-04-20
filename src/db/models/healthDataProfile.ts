/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose from 'mongoose';

const healthProfileSchema = new mongoose.Schema(
    {
        profile_name: { type: String, required: true, minlength: 2, maxlength: 50 },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
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
        timestamps: true,
    }
);

const HealthProfile = mongoose.model('healthProfile', healthProfileSchema);
export default HealthProfile;
