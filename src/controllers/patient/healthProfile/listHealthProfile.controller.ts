import { StatusCodes } from 'http-status-codes';
import HealthProfile from '../../../db/models/healthProfile';

export const listHealthProfile = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            sort = ['createdAt'],
        } = req.query;
        const healthProfiles = await HealthProfile.find({
            userId: req.user._id,
        })
            .skip((page - 1) * limit)
            .limit(limit)
            .sort(typeof sort === "string" ? sort : sort.join(" "));

        const totalHealthProfiles = await HealthProfile.countDocuments({
            userId: req.user._id,
        });

        const totalPages = Math.ceil(totalHealthProfiles / limit);

        return res.status(StatusCodes.OK).json({
            message: 'Health data list',
            healthProfiles,
            totalCount: totalHealthProfiles,
            page,
            limit,
            totalPages,
        });
    } catch (error) {
        console.log({ error });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};