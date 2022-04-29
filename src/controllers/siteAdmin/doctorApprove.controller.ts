import { StatusCodes } from "http-status-codes";
import { ACTIVITY_LOG_TYPES } from "../../../constant";
import User from "../../db/models/user";
import { Roles } from "../../lib/roles";
import S3 from '../../services/upload';
import activityLog from "../../services/activityLog";

export const doctorApprove = async (req, res) => {
    try {    
        return res.status(StatusCodes.OK).json({
            type: "success",
            status: true,
            message: "Admin Updated",
        });
    } catch (Err) {
        console.log(Err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: 'Admin not found',
        });
    }
};
