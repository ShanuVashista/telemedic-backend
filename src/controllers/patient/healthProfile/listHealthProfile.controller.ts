import { StatusCodes } from 'http-status-codes';
import HealthProfile from '../../../db/models/healthProfile';

export const listHealthProfile = async (req, res) => {
    try {
        const healthProfiles = await HealthProfile.find({
            userId: req.user._id,
        });

        return res.status(StatusCodes.OK).json({
            message: 'Health data list',
            healthProfiles,
        });
    } catch (error) {
        console.log({ error });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};