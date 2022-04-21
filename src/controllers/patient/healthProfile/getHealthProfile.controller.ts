import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import HealthProfile from '../../../db/models/healthProfile';

export const getHealthProfile = async (req, res) => {
    try {
        const healthProfile = await HealthProfile.findOne({
            userId: req.user._id,
            _id: req.params.id,
        });

        if (!healthProfile) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Health data not found",
            });
        }

        return res.status(StatusCodes.OK).json({
            message: "Health data found",
            healthProfile,
        });
    } catch (error) {
        console.log({ error });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};