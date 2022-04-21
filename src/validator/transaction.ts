import Joi from "joi";
import { objectId } from "./util";

export const createTransactionSchema = Joi.object().options({
    abortEarly: false,
    allowUnknown: false
}).keys({
    patientID: objectId.required(),
    doctorId: Joi.string().required(),
    amount: Joi.number().required(),
    transectionID: Joi.string().required(),
    Status: Joi.string().required(),
    dateTime: Joi.string().required(),
})
