/* eslint-disable no-useless-escape */
import StatusCodes from "http-status-codes";
import Prescription from '../../db/models/prescription.model';
// import User from '../../db/models/user';
const Prescription_POST = async (req, res) => {
    try {
        const prescriptionData = req.body;
        prescriptionData.doctor = req.user._id;
        const checkForHexRegExp = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
        if(req.user.role_id != 'doctor'){
            throw new Error('Doctor does not exist');
        }
        if (!checkForHexRegExp.test(prescriptionData.patient)) {
            throw new Error('Faild to match required pattern for Patient Id');
        }
        if (!checkForHexRegExp.test(prescriptionData.appointment)) {
            throw new Error('Faild to match required pattern for Appointment Id');
        }
        if(typeof (prescriptionData.prescription) == 'undefined' || prescriptionData.prescription == null || prescriptionData.prescription.length == 0){
            throw new Error('Prescription should contain some data');
        }
        const data = await Prescription.create(prescriptionData);

        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Prescription created successfully',
            data: data
        });
    } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message
            });
    }
}
const Prescription_PUT = async (req, res) => {
    try {
        const prescriptionData = req.body;
        const prescription_id = req.query;
        const checkForHexRegExp = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
        if(typeof (prescription_id.id) == 'undefined' || prescription_id.id == null){
            throw new Error('Prescription id is missing');
        }else{
            if (!checkForHexRegExp.test(prescription_id.id)) {
                throw new Error('Faild to match required pattern for Appointment Id');
            }else{
                const prescription_count = await Prescription.find({"_id":prescription_id.id});
                if(prescription_count.length == 0){
                    throw new Error('Prescription does not exist');
                }
                if(req.user.role_id != 'doctor'){
                    throw new Error('Doctor does not exist');
                }
                if (prescription_count[0].doctor != req.user._id) {
                    throw new Error('This prescription is not belong to this doctor');
                }
            }
        }
        if(typeof (prescriptionData.patient) != 'undefined' && prescriptionData.patient != null){
            if (!checkForHexRegExp.test(prescriptionData.patient)) {
                throw new Error('Faild to match required pattern for Patient Id');
            }
        }
        if(typeof (prescriptionData.prescription) == 'undefined' || prescriptionData.prescription == null || prescriptionData.prescription.length == 0){
            throw new Error('Prescription should contain some data');
        }
        const data = await Prescription.findByIdAndUpdate(prescription_id.id,prescriptionData,{new:true});

        res.status(StatusCodes.OK).json({
            success: true,
            message: 'Prescription updated successfully',
            data: data
        });
    } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message
            });
    }
}
export default {Prescription_POST,Prescription_PUT}