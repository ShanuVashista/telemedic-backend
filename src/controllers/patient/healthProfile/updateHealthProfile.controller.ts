import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import HealthProfile, { IHealthProfile } from '../../../db/models/healthProfile.model';
import { deleteFileByPath } from '../../../lib/deleteFileByPath';
import uploadFile from '../../../services/upload';

export const updateHealthProfile = async (req, res) => {
    try {
        const healthProfile: mongoose.HydratedDocument<IHealthProfile> =
            await HealthProfile.findOne({
                userId: req.user._id,
                _id: req.params.id,
            })

        if (!healthProfile) {
            return res.status(StatusCodes.NOT_FOUND).json({
                type: "error",
                message: "Health data not found"
            });
        }

        // const oldProfileImage = healthProfile.profile_image;

        healthProfile.profile_image = req.file?.filename;
        Object.entries(req.body).forEach(([key, value]) => {
            healthProfile[key] = value;
        });

        await healthProfile.save();
        const upload_data = {
            db_response: healthProfile,
            file: req.files[0]
        }
        const image_uri = await uploadFile(upload_data);
        const response = await HealthProfile.findByIdAndUpdate(healthProfile._id, { $set: { "profile_image": image_uri.Location } }, { new: true });
        // await saveFile(req.user, req);

        // if (oldProfileImage) {
        //     const userDir = path.resolve(`./public/uploads/${req.user._id}`);
        //     const oldFilePath = path.join(userDir, oldProfileImage);

        //     await deleteFileByPath(oldFilePath);
        // }

        return res.status(StatusCodes.OK).json({
            type: "success",
            message: "Health data updated",
            response,
        });

    } catch (error) {
        console.log({ error });
        deleteFileByPath(req.file?.path);
        return res.status(400).json({
            type: "error",
            message: error.message,
        });
    }
};