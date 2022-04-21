import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import HealthProfile from '../../../db/models/healthProfile';

export const updateHealthProfile = async (req, res) => {
    try {
        const healthProfile = await HealthProfile.findOneAndUpdate({
            _id: req.params.id,
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