/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import activityLog from "../../src/db/models/activityLogs.model";


// Function to Create an Appointment
const create = async (userId,userType,type,macAddress,endPoint,data) => {
    let currentDate = new Date()
    // Get the data from query body
        const newActivity = new activityLog({
            userId : userId,
            userType : userType,
            type: type,
            time: currentDate,
            macAddress: macAddress,
            endPoint : endPoint,
            data : data
        });
        let activityData = await newActivity.save();
        return activityData;
    
};


export default { create };
