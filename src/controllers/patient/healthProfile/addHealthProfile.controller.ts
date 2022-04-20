import { StatusCodes } from 'http-status-codes';
import HealthProfile from '../../../db/models/healthProfile';

export const addHealthProfile = async (req, res) => {
    try {
        const healthProfile = await HealthProfile.create({
            ...req.body,
            userId: req.user._id,
        });

        return res.status(StatusCodes.OK).json({
            message: 'Health data added',
            healthProfile,
        });
    } catch (error) {
        console.log({ error });
        return res.status(400).json({
            message: error.message,
        });
    }
};
