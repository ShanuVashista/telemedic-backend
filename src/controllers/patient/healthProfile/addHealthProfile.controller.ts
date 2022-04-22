import { StatusCodes } from 'http-status-codes';
import HealthProfile from '../../../db/models/healthProfile.model';
import { saveFile } from '../../../lib/saveFile';

export const addHealthProfile = async (req, res) => {
    try {
        const healthProfile = await HealthProfile.create({
            ...req.body,
            userId: req.user._id,
            profile_image: req.file?.filename,
        });

        await saveFile(req.user, req);

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
