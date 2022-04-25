/* eslint-disable prefer-const */
/* eslint-disable no-useless-escape */
// import jwt from "jsonwebtoken";
import StatusCodes from "http-status-codes";
import User from '../../db/models/user';
const List_POST = async (req, res) => {
    try {
        let { page, limit, sort, cond } = req.body;
        if (!page || page < 1) {
            page = 1;
        }
        if (!limit) {
            limit = 10;
        }
        if (!cond) {
            cond = {}
        }
        if (!sort) {
            sort = { "createdAt": -1 }
        }
        limit = parseInt(limit);
        const user = await User.find(cond).sort(sort).skip((page - 1) * limit).limit(limit)
        user.forEach(oneUser => oneUser.populate('paymentMethods'))

        const user_count = await User.find(cond).count()
        const totalPages = Math.ceil(user_count / limit);
        res.status(StatusCodes.OK).send({
            status: true,
            message: "User List Fetch Successfully",
            page: page,
            limit: limit,
            totalPages: totalPages,
            total: user_count,
            data: user,
        });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: error.message
        });
    }
}
export default List_POST