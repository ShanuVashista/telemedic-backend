import Notification from '../../db/models/notification.model';
import { filterPaginate } from '../../lib/filterPaginate';

export const listNotifications = async (req, res) => {
    const { f = {} } = req.query;
    const filter = {
        userId: req.user._id,
        ...f,
    };

    const {
        docs: notifications,
        totalDocs: totalNotifications,
        totalPages,
        page,
        limit,
    } = await filterPaginate(Notification, filter, req.query);

    res.status(200).json({
        message: 'Notifications list',
        notifications,
        totalCount: totalNotifications,
        page,
        limit,
        totalPages,
    });
};
