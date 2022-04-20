/* eslint-disable prefer-const */
/* eslint-disable no-useless-escape */
import jwt from "jsonwebtoken";
import StatusCodes from "http-status-codes";
import User from '../../db/models/user';
const List_POST = async (req, res) => {
    try {
        let { skip, limit, sort, cond } = req.body;
        if (!skip) {
            skip = 0;
        }
        if (!limit) {
            limit = 10;
        }
        limit = parseInt(limit);
        const user = await User.find(cond).sort(sort).skip(skip).limit(limit)
        const user_count = await User.find(cond).count()
        res.status(StatusCodes.OK).send({
            pagination:{
                skip:skip,
                limit:limit,
                sub_total:user.length,
                total:user_count,
            },
            Info: user,
        });
    } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message
            });
    }
}
export default List_POST