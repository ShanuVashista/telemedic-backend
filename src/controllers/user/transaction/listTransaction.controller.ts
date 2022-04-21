import { StatusCodes } from 'http-status-codes';
import Transaction from '../../../db/models/transaction.model';
import { filterPaginate } from '../../../lib/filterPaginate';

export const listTransaction = async (req, res) => {
    try {
        const { f } = req.query;

        const filter = {
            patientID: req.user._id,
            ...f,
        };

        const {
            docs: transactions,
            totalDocs: totalTransactions,
            totalPages,
            page,
            limit,
        } = await filterPaginate(Transaction, filter, req.query);

        return res.status(StatusCodes.OK).json({
            message: 'Transaction list',
            transactions,
            totalCount: totalTransactions,
            page,
            limit,
            totalPages,
        });
    } catch (error) {
        console.log({ error });
        return res.status(400).json({
            message: error.message,
        });
    }
};
