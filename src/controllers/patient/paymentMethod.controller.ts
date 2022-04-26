import { StatusCodes } from 'http-status-codes';
import PaymentMethod from '../../db/models/paymentMethod.model';
import { filterPaginate } from '../../lib/filterPaginate';

export const savePaymentMethod = async (req, res) => {
    try {
        const paymentMethod = await PaymentMethod.create({
            ...req.body,
            userId: req.user._id,
        });

        return res.status(StatusCodes.OK).json({
            type: "success",
            message: 'Payment method saved',
            data: { paymentMethod },
        });
    } catch (error) {
        console.log({ error });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            type: "error",
            message: error.message,
        });
    }
};

export const getPaymentMethod = async (req, res) => {
    try {
        const { f = {} } = req.query;

        const filter = {
            userId: req.user._id,
            ...f,
        };

        const {
            docs: paymentMethods,
            total,
            totalPages,
            page,
            limit
        } = await filterPaginate(PaymentMethod, filter, req.query);

        return res.status(StatusCodes.OK).json({
            type: "success",
            message: 'Payment method found',
            paymentMethods,
            total,
            page,
            limit,
            totalPages,
        });
    } catch (error) {
        console.log({ error });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            type: "error",
            message: error.message,
        });
    }
};

export const deletePaymentMethod = async (req, res) => {
    try {
        const { id } = req.params;

        const paymentMethod = await PaymentMethod.findOne({
            _id: id,
            userId: req.user._id,
        });

        if (!paymentMethod) {
            return res.status(StatusCodes.NOT_FOUND).json({
                type: "error",
                message: 'Payment method not found',
            });
        }

        await paymentMethod.remove();

        return res.status(StatusCodes.OK).json({
            type: "success",
            message: 'Payment method deleted',
        });
    } catch (error) {
        console.log({ error });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            type: "error",
            message: error.message,
        });
    }
};