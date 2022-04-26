import { StatusCodes } from 'http-status-codes';
import HealthProfile from '../../../db/models/healthProfile.model';

export const deleteHealthProfile = async (req, res) => {
    try {
        const healthProfile = await HealthProfile.findOneAndDelete({
            userId: req.user._id,
            _id: req.params.id,
        });

        if (!healthProfile) {
            return res.status(StatusCodes.NOT_FOUND).json({
                type: "error",
                status: false,
                message: "Health data not found",
            });
        }

        return res.status(StatusCodes.OK).json({
            type: "success",
            status: true,
            message: "Health data deleted"
        });
    } catch (error) {
        console.log({ error });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            type: "error",
            status: false,
            message: error.message,
        });
    }
};