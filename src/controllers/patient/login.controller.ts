import { unlinkSync } from "fs";
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';
import User from "../../db/models/user";
import bcrypt from 'bcrypt'

const login = async (req, res) => {
    const {email,password} = req.body;

    try {
        User.findOne({
            email: email
        })
        .exec((err,user) => {
            if(err){
                res.status(500).send({message: err});
                return;
            }
            if(!user){
                return res.status(200).send({message:"User Not Found"})
            }
             
            const passwordIsValid = bcrypt.compareSync(
                password,
                user.password
            );

            if(!passwordIsValid) {
                return res.status(401).send({
                    accesstoken: null,
                    message: "Invalid Password!"
                });
            }

            const token = jwt.sign({id:user.id}, 'SECRET_KEY', {
                expiresIn: 86400  //24 hours
            });


            res.status(StatusCodes.OK).json({
            message: "User loggedin successfully",
            accesstoken: token,
            data: user
            });
        })
       

    } catch (error) {
        // mongoose email exists error
        if (error.code === 11000) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "User already exists"
            });
        }
        console.log({ error });
        unlinkSync(req.file.path);
        return res.status(400).json({
            message: error.message
        })
    }
}
export default { login }