import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import path from 'path';
import HealthProfile, { IHealthProfile } from '../../../db/models/healthProfile.model';
import { deleteFileByPath } from '../../../lib/deleteFileByPath';
import { saveFile } from '../../../lib/saveFile';

export const updateHealthProfile = async (req, res) => {
    try {
        const healthProfile: mongoose.HydratedDocument<IHealthProfile> =
            await HealthProfile.findOne({
                userId: req.user._id,
                _id: req.params.id,
            })

        if (!healthProfile) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Health data not found"
            });
        }

        const oldProfileImage = healthProfile.profile_image;

        healthProfile.profile_image = req.file?.filename;
        Object.entries(req.body).forEach(([key, value]) => {
            healthProfile[key] = value;
        });

        await healthProfile.save();

        await saveFile(req.user, req);

        if (oldProfileImage) {
            const userDir = path.resolve(`./public/uploads/${req.user._id}`);
            const oldFilePath = path.join(userDir, oldProfileImage);

            await deleteFileByPath(oldFilePath);
        }

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