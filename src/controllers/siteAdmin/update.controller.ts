import { StatusCodes } from "http-status-codes";
import User from "../../db/models/user";
import { Roles } from "../../lib/roles";

export const updateAdmin = async (req, res) => {
    try {
        const admin = await User.findOne({
            _id: req.user.id,
            role_id: Roles.ADMIN
        })

        if (!admin) {
            return res.status(StatusCodes.NOT_FOUND).json({
                type: "error",
                status: false,
                message: "User Not Found"
            })
        }

        Object.entries(req.body).forEach(([key, value]) => {
            admin[key] = value;
        });

        await admin.save();

        return res.status(StatusCodes.OK).json({
            type: "success",
            status: true,
            message: "Admin Updated",
            data: admin
        });
    } catch (Err) {
        console.log(Err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: 'Admin not found',
        });
    }
};
