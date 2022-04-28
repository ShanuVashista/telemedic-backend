import Joi from 'joi';

// array should allow at most 10 items
export const addAvailabilitySchema = Joi.array()
    .items(
        Joi.object({
            start: Joi.string().isoDate().required(),
            end: Joi.string().isoDate().required(),
            break_start: Joi.string().isoDate(),
            break_end: Joi.string().isoDate(),
        })
            .and('break_start', 'break_end')
            .custom((value) => {
                if (value.start > value.end) {
                    throw new Error('Start time should be less then end time');
                }

                if (!(value.break_start && value.break_end)) return true;

                if (value.break_start > value.break_end) {
                    throw new Error('Break start must be before break end');
                }

                if (value.break_start < value.start || value.break_end > value.end) {
                    throw new Error('Break start and end must be within the time range');
                }

                return true;
            })
    )
    .max(2)
    .required()
    .options({
        abortEarly: false,
        allowUnknown: false,
    });
