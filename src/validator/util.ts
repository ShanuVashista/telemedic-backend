import Joi from "joi";

export const paginationQuerySchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).default(10),
    sort: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string())
    ).default(['createdAt']),
    f: Joi.object().keys({
        name: Joi.string(),
        weight: Joi.number(),
        height: Joi.number(),
        bmi: Joi.number(),
        medicalCondition: Joi.string(),
        pastMedicalCondition: Joi.string(),
        alergies: Joi.string(),
        medication: Joi.string(),
        smoking: Joi.boolean(),
        alcohol: Joi.boolean(),
        marijuana: Joi.boolean(),
    }).default({})
}).options({
    allowUnknown: true,
});