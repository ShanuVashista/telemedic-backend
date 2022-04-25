/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import Appointment from "../../db/models/appointment.model";

interface Appointment {
  userId: number;
  appointmentId: number;
  createdAt: Date;
  doctorId: number;
  doctor: number;
  dateOfAppointment: Date;
  appointmentType: string;
}

//getting all Appointments
const getAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { page, limit, sort, cond } = req.body;
    if (!page || page < 1) {
      page = 1;
    }
    if (!limit) {
      limit = 10;
    }
    if (!cond) {
      cond = {}
    }
    if (!sort) {
      sort = { "createdAt": -1 }
    }
    limit = parseInt(limit);
    const result = await Appointment.find(cond).sort(sort).skip((page - 1) * limit).limit(limit)
    const result_count = await Appointment.find(cond).count()
    const totalPages = Math.ceil(result_count / limit);
    return res.status(200).json({
      status: true,
      message: 'Appointment Fetch Successfully',
      page: page,
      limit: limit,
      totalPages: totalPages,
      total: result_count,
      data: result,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// Get Appointment By ID
const getAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const { Appointmentid } = req.params;

    const result = await Appointment.findById(Appointmentid);

    return res.status(200).json({
      message: true,
      data: result
    });

  } catch (Err) {
    // console.log(Err);
    res.status(404).json({
      success: false,
      message: "Appointment not found"
    })
  }

};

// Update an Appointment By ID
const updateAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const { Appointmentid } = req.params;
    const { isEmergency, dateOfAppointment } = req.body;

    const doc = await Appointment.findById(Appointmentid);

    const update = { isEmergency: isEmergency, dateOfAppointment: dateOfAppointment };
    await doc.updateOne(update);

    const updateDoc = await Appointment.findById(Appointmentid);

    return res.status(200).json({
      message: true,
      data: updateDoc
    });

  } catch (Err) {
    // console.log(Err);
    res.status(404).json({
      success: false,
      message: "Appointment not found"
    })
  }

};


// Delete Appointment ById
const deleteAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const { Appointmentid } = req.params;

    const result = await Appointment.deleteOne({ _id: Appointmentid });

    return res.status(200).json({
      message: true,
      data: "Appointment Delete Successful"
    });

  } catch (Err) {
    // console.log(Err);
    res.status(404).json({
      success: false,
      message: "Appointment not found"
    })
  }

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
    doctor,
    appointmentType,
    dateOfAppointment,
  }: Appointment = req.body;

  try {
    // const doctor = doctorId
    const newAppointment = new Appointment({
      userId,
      doctor,
      appointmentType,
      dateOfAppointment,
    });
    await newAppointment.save();

    res.status(201).json({
      success: true,
      data: newAppointment
    })
  } catch (Err) {
    console.log(Err);
    res.status(404).json({
      success: false,
      message: "One Or More Required Field is empty"
    })
  }
};

// TODO:
// We Need to Fetch Doctor Details using DoctorId by virtual Method doctor collection
// We need to Fetch User Details using UserID by virtual method from user collection
// Need to change name _id to appointmentId


export default { getAppointments, addAppointment, getAppointment, updateAppointment, deleteAppointment };
