import { StatusCodes } from "http-status-codes";
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
                type: "error",
                status: false,
                message: "User not found"
            });
        }

        return res.status(StatusCodes.OK).json({
            type: "success",
            status: true,
            message: "Health data updated",
            data: { user },
        });

    } catch (error) {
        // mongoose email exists error
        if (error.code === 11000) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                type: "error",
                status: false,
                message: "User already exists"
            });
        }
        console.log({ error });
        return res.status(400).json({
            type: "error",
            status: false,
            message: error.message
        })
    }
}
export default healthData