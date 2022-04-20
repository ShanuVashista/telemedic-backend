import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import HealthProfile from '../../../db/models/healthProfile';

export const updateHealthProfile = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Please provide a valid user id"
            });
        }

        const healthProfile = await HealthProfile.findOneAndUpdate({
            _id: id,
            userId: req.user._id,
        }, { ...req.body }, { new: true });

        if (!healthProfile) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Health data not found"
            });
        }

        return res.status(StatusCodes.OK).json({
            message: "Health data updated",
            healthProfile,
        });

    } catch (error) {
        console.log({ error });
        return res.status(400).json({
            message: error.message,
        });
    }
};