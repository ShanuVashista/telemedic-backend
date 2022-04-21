import { StatusCodes } from 'http-status-codes';
import Transaction from '../../../db/models/transaction.model';

export const createTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.create({
            ...req.body,
            patientID: req.user._id,
        });

        return res.status(StatusCodes.OK).json({
            message: 'Transaction created',
            transaction,
        });
    } catch (error) {
        console.log({ error });
        return res.status(400).json({
            message: error.message,
        });
    }
};
