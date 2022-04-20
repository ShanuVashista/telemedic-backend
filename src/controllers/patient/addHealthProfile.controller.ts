import { StatusCodes } from 'http-status-codes';
import HealthProfile from '../../db/models/healthDataProfile';

const addHealthProfile = async (req, res) => {
    try {
        console.log(req.user);

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
export default addHealthProfile;
