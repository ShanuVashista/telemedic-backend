import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import User from "../../db/models/user";
import { Roles } from "../../lib/roles";

const healthData = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({
            _id: req.user._id,
            role_id: Roles.PATIENT
        }, { ...req.body }, { new: true });

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "User not found"
            });
        }

        return res.status(StatusCodes.OK).json({
            message: "Health data updated",
            user,
        });

    } catch (error) {
        // mongoose email exists error
        if (error.code === 11000) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "User already exists"
            });
        }
        console.log({ error });
        return res.status(400).json({
            message: error.message
        })
    }
}
export default healthData