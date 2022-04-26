import { StatusCodes } from 'http-status-codes';
import HealthProfile from '../../../db/models/healthProfile.model';
// import { saveFile } from '../../../lib/saveFile';
import uploadFile from '../../../services/upload';
export const addHealthProfile = async (req, res) => {
    try {
        const healthProfile = await HealthProfile.create({
            ...req.body,
            userId: req.user._id
        });
        const upload_data = {
            db_response: healthProfile,
            file: req.files[0]
        }
        const image_uri = await uploadFile(upload_data);
        const response = await HealthProfile.findByIdAndUpdate(healthProfile._id, { $set: { "profile_image": image_uri.Location } }, { new: true });
        // await saveFile(req.user, req);

        return res.status(StatusCodes.OK).json({
            type: "success",
            status: true,
            message: 'Health data added',
            data: {
                ...response.toObject(),
            },
        });
    } catch (error) {
        console.log({ error });
        return res.status(400).json({
            type: "error",
            status: false,
            message: error.message,
        });
    }
};
