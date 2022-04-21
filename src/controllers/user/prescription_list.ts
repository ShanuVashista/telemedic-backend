/* eslint-disable prefer-const */
/* eslint-disable no-useless-escape */
import Prescription from '../../db/models/prescription.model';
import StatusCodes from "http-status-codes";
// import User from '../../db/models/user';
const Prescription_List_POST = async (req, res) => {
    try {
        let { skip, limit, sort, cond } = req.body;
        if (!skip) {
            skip = 0;
        }
        if (!limit) {
            limit = 10;
        }
        if(!cond){
            cond = {}
        }
        limit = parseInt(limit);
        const prescription = await Prescription.find(cond).populate('patient_details').populate('doctor_details').populate('appointment_details').sort(sort).skip(skip).limit(limit)
        const prescription_count = await Prescription.find(cond).count()
        res.status(StatusCodes.OK).send({
            status:true,
            message:"Prescription List Fetch Successfully",
            pagination:{
                skip:skip,
                limit:limit,
                sub_total:prescription.length,
                total:prescription_count,
            },
            data: prescription,
        });
    } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message
            });
    }
}
export default Prescription_List_POST