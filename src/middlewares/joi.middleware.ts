import { Schema } from "joi";


export const validateBody = (schema: Schema) => {
    return validate(schema, 'body');
}

export const validateQuery = (schema: Schema) => {
    return validate(schema, 'query');
}

export const validate = (schema: Schema, key) => {
    return (req, res, next) => {
        const { error } = schema.validate(req[key]);
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');

            console.log("error", message);
            res.status(422).json({ error: message })
        }
    }
}