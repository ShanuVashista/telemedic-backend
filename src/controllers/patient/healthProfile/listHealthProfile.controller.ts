import { StatusCodes } from 'http-status-codes';
import HealthProfile from '../../../db/models/healthProfile';
import { filterPaginate } from '../../../lib/filterPaginate';

export const listHealthProfile = async (req, res) => {
    try {
        const { page = 1, limit = 10, sort = ['createdAt'], f = {} } = req.query;

        const filter = {
            userId: req.user._id,
            ...f,
        };

        const {
            docs: healthProfiles,
            totalDocs: totalHealthProfiles,
            totalPages,
        } = await filterPaginate(HealthProfile, filter, page, limit, sort);

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

