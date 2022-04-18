/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
// import axios, { AxiosResponse } from "axios";
import Appointment from "../../db/models/appointment.model";

interface Appointment {
  userId: number;
  appointmentId: number;
  createdAt: Date;
  doctorId: number;
  dateOfAppointment: Date;
  appointmentType: string;
}

//getting all Appointments

const getAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await Appointment.find({})
  return res.status(200).json({
    message:true ,
    data: result
  });
};


// Function to Create an Appointment
const addAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the data from query body
  const {
    userId,
    doctorId,
    appointmentType,
    dateOfAppointment,
    appointmentId,
  }: Appointment = req.body;

  try {
    const newAppointment = new Appointment({
      userId,
      doctorId,
      appointmentType,
      dateOfAppointment,
    });
    await newAppointment.save();

    res.status(201).json({
      success:true,
      data: newAppointment
    })
  } catch (Err) {
    console.log(Err);
    res.status(404).json({
      success:false,
      message: "One Or More Required Field is empty"
    })
  }
};

// TODO:
// We Need to Fetch Doctor Details using DoctorId by virtual Method doctor collection
// We need to Fetch User Details using UserID by virtual method from user collection
// Need to change name _id to appointmentId


export default { getAppointments, addAppointment };
