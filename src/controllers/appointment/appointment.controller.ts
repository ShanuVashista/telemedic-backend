/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
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
  //get All Appointments
  const result: AxiosResponse = await axios.get(
    `https://jsonplaceholder.typicode.com/posts`
  );
  // let result = Appointment
  const appointments: [Appointment] = result.data;
  return res.status(200).json({
    message: appointments,
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

    res.json({ userId, doctorId, appointmentId });
  } catch (Err) {
    console.log(Err);
  }
};

export default { getAppointments, addAppointment };
