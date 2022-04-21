import Notification from '../../db/models/notification.model';
import { filterPaginate } from '../../lib/filterPaginate';

export const listNotifications = async (req, res) => {
    const { page = 1, limit = 10, sort = ['createdAt'], f = {} } = req.query;
    const filter = {
        userId: req.user._id,
        ...f,
    };

    const {
        docs: notifications,
        totalDocs: totalNotifications,
        totalPages,
    } = await filterPaginate(Notification, filter, page, limit, sort);

    res.status(200).json({
        message: 'Notifications list',
        notifications,
        totalCount: totalNotifications,
        page,
        limit,
        totalPages,
    });
};
