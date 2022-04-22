import { StatusCodes } from "http-status-codes";
import User from "../../db/models/user";

export const savePaymentMethod = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id });

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "User not found",
            });
        }

        const { type: paymentMethodType, ...paymentMethod } = req.body;
        user.payment_method[paymentMethodType] = paymentMethod;

        await user.save({ validateBeforeSave: false });

        return res.status(StatusCodes.OK).json({
            message: "Payment method saved",
            user,
            payment: user.payment_method,
        });
    } catch (error) {
        console.log({ error });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
}