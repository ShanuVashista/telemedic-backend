import { StatusCodes } from 'http-status-codes';
import User from '../../db/models/user';

export const savePaymentMethod = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id });

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'User not found',
            });
        }

        const { type: paymentMethodType, ...paymentMethod } = req.body;
        if (!user.payment_method) {
            user.payment_method = {};
        }
        user.payment_method = {
            ...user.payment_method,
            [paymentMethodType]: paymentMethod,
        };

        const updatedUser = await user.save({ validateBeforeSave: false });

        return res.status(StatusCodes.OK).json({
            message: 'Payment method saved',
            user: updatedUser,
        });
    } catch (error) {
        console.log({ error });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};

export const getPaymentMethod = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id });

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'User not found',
            });
        }

        return res.status(StatusCodes.OK).json({
            message: 'Payment method found',
            payment: user.payment_method,
        });
    } catch (error) {
        console.log({ error });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};
