import mongoose from 'mongoose'

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

        current_practise_address: { type: Object }, 

        license: { type: Array }

    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("user", userSchema);