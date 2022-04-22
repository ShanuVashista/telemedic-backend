import Joi from "joi";

export const paymentMethod = Joi.alternatives().try(
    Joi.object().keys({
        card_number: Joi.string().required(),
        card_name: Joi.string().required(),
        card_expiry: Joi.string().custom((value) => {
            const [month, year] = value.split("/");
            Joi.assert(parseInt(month), Joi.number().integer().min(1).max(12).required());
            Joi.assert(parseInt(year), Joi.number().integer().min(1).max(99).required());
            return value;
        }).required(),
        card_cvv: Joi.string().length(3).required(),
        type: Joi.string().valid("card").required(),
    }),
    Joi.object().keys({
        bank_name: Joi.string().required(),
        account_number: Joi.string().required(),
        account_name: Joi.string().required(),
        account_type: Joi.string().required(),
        ifsc_code: Joi.string().required(),
        type: Joi.string().valid("bank").required(),
    })
).required();
