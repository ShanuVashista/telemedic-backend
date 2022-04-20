import { StatusCodes } from 'http-status-codes';
import HealthProfile from '../../../db/models/healthProfile';

export const listHealthProfile = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            sort = ['createdAt'],
            f = {},
        } = req.query;

        const filter = {
            userId: req.user._id,
            ...f,
        };

        const healthProfiles = await HealthProfile.find(filter)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort(typeof sort === "string" ? sort : sort.join(" "));

        const totalHealthProfiles = await HealthProfile.countDocuments(filter);

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