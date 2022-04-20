import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import HealthProfile from '../../../db/models/healthProfile';

export const deleteHealthProfile = async (req, res) => {
    try {
        // get id path param
        const { id } = req.params;

        // check if valid bson id
        if (!mongoose.isValidObjectId(id)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Please provide a valid user id"
            });
        }

        const healthProfile = await HealthProfile.findOneAndDelete({
            userId: req.user._id,
            _id: id,
        });

        if (!healthProfile) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Health data not found",
            });
        }

        return res.status(StatusCodes.OK).json({
            message: "Health data deleted"
        });
    } catch (error) {
        console.log({ error });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};