import { StatusCodes } from 'http-status-codes';
import HealthProfile from '../../../db/models/healthProfile.model';
import { deleteFileByPath } from '../../../lib/deleteFileByPath';
import { saveFile } from '../../../lib/saveFile';

export const updateHealthProfile = async (req, res) => {
    try {
        const healthProfile = await HealthProfile.findOneAndUpdate({
            _id: req.params.id,
            userId: req.user._id,
        }, { ...req.body, profile_image: req.file?.filename }, { new: true });

        if (!healthProfile) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Health data not found"
            });
        }

        await saveFile(req.user, req);

        return res.status(StatusCodes.OK).json({
            message: "Health data updated",
            healthProfile,
        });

    } catch (error) {
        console.log({ error });
        deleteFileByPath(req.file?.path);
        return res.status(400).json({
            message: error.message,
        });
    }
};