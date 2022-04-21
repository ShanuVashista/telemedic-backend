/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose from 'mongoose';
import User from './user';

const transactionSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        transactionId: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50,
        },
        Status: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50,
        },
        dateTime: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

transactionSchema.pre('save', async function (next) {
    if (this.isModified('Status')) {
        this.dateTime = new Date();
    }

    if (this.doctorId.toString() === this.patientID.toString()) {
        return next(new Error('Doctor cannot be patient'));
    }

    const doctorExists = await User.exists({ _id: this.doctorId });
    if (!doctorExists) {
        return next(new Error('Doctor does not exist'));
    }

    const patientExists = await User.exists({ _id: this.patientID });
    if (!patientExists) {
        return next(new Error('Patient does not exist'));
    }

    next();
});

const Transaction = mongoose.model('transaction', transactionSchema);
export default Transaction;
