/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import User from "../../db/models/user";
import { StatusCodes } from "http-status-codes";



const forgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
        const {email} =req.body
        res.status(StatusCodes.OK).json({
            message: "User is not logged In",
            data: email
        });
    }catch(err){

    }
}



const resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{

    }catch(err){

    }
}

export default {forgotPassword,resetPassword};
