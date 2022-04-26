import { StatusCodes } from 'http-status-codes';
import Transaction from '../../../db/models/transaction.model';

export const getTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({
            _id: req.params.id,
            patientID: req.user._id,
        });

        if (!transaction) {
            return res.status(StatusCodes.NOT_FOUND).json({
                type: "error",
                message: 'Transaction not found',
            });
        }

        return res.status(StatusCodes.OK).json({
            type: "success",
            message: 'Transaction found',
            data: { transaction },
        });
    } catch (error) {
        console.log({ error });
        return res.status(400).json({
            type: "error",
            message: error.message,
        });
    }
};
