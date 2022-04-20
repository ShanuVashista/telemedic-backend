import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';
import User from "../db/models/user";

export default async function auth(req, res, next) {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({
            _id: decoded._id,
        });

        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "User not found"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log({ error });
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: error.message
        });
    }
}