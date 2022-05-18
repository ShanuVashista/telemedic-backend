import Joi from "joi";
import { OrganizationTypes } from "../lib/organizationEnum";

export const createOrganizationSchema = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().valid(
        ...Object.values(OrganizationTypes)
    ).required(),
    location: Joi.object({
        address: Joi.string().required(),
        city: Joi.string().required(),
        country: Joi.string().required(),
    }).required(),
    contact_person: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email(),
        phone: Joi.string(),
    }).or('email', 'phone')
}).required();