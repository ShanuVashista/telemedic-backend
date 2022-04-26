import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';
import User from "../../db/models/user";
import bcrypt from 'bcrypt'

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        User.findOne({
            email: email
        })
            .exec((err, user) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                if (!user) {
                    return res.status(404).send({ message: "User Not Found" })
                }

                const passwordIsValid = bcrypt.compareSync(
                    password,
                    user.password
                );

                if (!passwordIsValid) {
                    return res.status(404).send({
                        message: "Invalid Password!"
                    });
                }

                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: 86400  //24 hours
                });


                res.status(StatusCodes.OK).json({
                    type: "success",
                    message: "User Successfully Logged-In",
                    data: {
                        ...user.toObject(),
                        token: token,
                    },
                });
            })


    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message
        })
    }
}
export default { login }