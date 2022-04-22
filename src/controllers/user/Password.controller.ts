/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import User from "../../db/models/user";
import Token from "../../db/models/token";
import { StatusCodes } from "http-status-codes";
import crypto from 'crypto';
import Joi from "joi";



const forgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
        const {email} =req.body
        const schema = Joi.object({email: Joi.string().email().required()})
        const {error} = schema.validate(req.body);

        if(error) return res.status(404).send(error.details[0].message);
        
        const user = await User.findOne({email: email})

        if(!user){
            return res.status(400).send({message:"user with given email doesn't exist"});
        } 

        let token = await Token.findOne({userId:user._id})

        if(!token){
            token = await new Token ({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;

        res.status(StatusCodes.OK).json({
            message: "Password Reset Link Send to your email",
            Password_Reset_Link: link
        });

    }catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "An Error Occured Please Try After Some Time!"
        });
    }
}




const resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
    const pass_rgex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    try{
        const {password,confirmPassword} = req.body
       
        const schema = Joi.object({password: Joi.string().required(),confirmPassword: Joi.string().required()});
        const {error} = schema.validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const user = await User.findById(req.params.userId);
        if(!user) return res.status(400).send("Invalid Link or expired")

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        });
        if(!token) return res.status(400).send("Invalid Link or expired")

        if(!pass_rgex.test(password)){
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
            });        }
        if(password !== confirmPassword){
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Password didn't Match"
            });
        }

        user.password = password;
        await user.save()
        
        return res.status(StatusCodes.OK).json({
            message: "Password change successful",
            data: user.password
        });
    }catch(err){

    }
}

export default {forgotPassword,resetPassword};

