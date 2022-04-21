import Joi from "joi";

export const paginationQuerySchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).default(10),
    sort: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string())
    ).default(['createdAt']),
}).options({
    allowUnknown: true,
});