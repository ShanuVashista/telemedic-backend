import { StatusCodes } from 'http-status-codes';
import Availability from '../../db/models/availability.model';

export const addAvailability = async (req, res) => {
    try {
        await checkForConflict(req.body, req.user._id);
        const availabilities = await Availability.insertMany(
            req.body.map((availability) => ({
                ...availability,
                doctorId: req.user._id,
            }))
        );

        res.status(StatusCodes.OK).json({
            type: 'success',
            status: true,
            message: 'Availability added',
            data: { availabilities },
        });
    } catch (error) {
        console.log('Error in adding availability', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            type: 'error',
            status: false,
            message: error.message,
        });
    }
};

export async function checkForConflict(availabilities, doctorId) {
    const sortedAvailabilities = availabilities.sort((a, b) => {
        return a.start - b.start;
    }).map((availability) => ({
        ...availability,
        start: new Date(availability.start),
        end: new Date(availability.end),
    }));

    for (let i = 0; i < sortedAvailabilities.length - 1; i++) {
        const current = sortedAvailabilities[i];
        const next = sortedAvailabilities[i + 1];

        if (current.end >= next.start) {
            throw new Error('Conflict in provided availability data');
        }
    }

    // Check for overlapping availability in the db
    const dbAvailabilities = await Availability.find({
        doctorId: doctorId,
        $or: [
            ...sortedAvailabilities.map((availability) => ({
                $or: [
                    {
                        start: { $lte: availability.start },
                        end: { $gte: availability.start },
                    },
                    {
                        start: { $lte: availability.end },
                        end: { $gte: availability.end },
                    },
                    {
                        start: { $gte: availability.start },
                        end: { $lte: availability.end },
                    }
                ],
            })),
        ],
    });

    if (dbAvailabilities.length) {
        throw new Error('Conflict with existing availability');
    }
}