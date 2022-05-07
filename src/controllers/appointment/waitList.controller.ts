import { StatusCodes } from "http-status-codes";
import { isAfter, differenceInMinutes } from "date-fns";
import Appointment from "../../db/models/appointment.model";
import { AppointmentStatuses } from "../../lib/appointmentStatuses";
import { getSlotIndex, getSlots } from "../../lib/utils/timeSlots";
import Availability from "../../db/models/availability.model";
import { generateAvailabilityByTimeFilter } from "./availabilityUtil";

export const waitList = async (req, res) => {
  try {
    const appointmentData = await Appointment.find({
      patientId: req.user._id,
      dateOfAppointment: {
        $gte: new Date(),
      },
    }).limit(1);

    const appointment = await Appointment.findOne({
      patientId: req.user._id,
      _id: appointmentData[0]._id,
    });

    if (!appointment) {
      return res.status(StatusCodes.NOT_FOUND).json({
        type: "error",
        status: false,
        message: "Appointment not found",
      });
    }

    if (appointment.status !== AppointmentStatuses.PENDING) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        type: "error",
        status: false,
        message: "Appointment is not pending",
      });
    }

    if (isAfter(new Date(), appointment.dateOfAppointment)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        type: "error",
        status: false,
        message: "Appointment date is in the past",
      });
    }

    appointment.dateOfAppointment.setSeconds(0, 0);

    const availability = await Availability.findOne({
      doctorId: appointment.doctorId,
      ...generateAvailabilityByTimeFilter(appointment.dateOfAppointment),
    });

    if (availability === null) {
      return res.status(StatusCodes.OK).json({
        type: "success",
        status: true,
        message: "Doctor Not Available At booked Time Schedule",
      });
    }

    const start =
      availability.start ?? new Date(appointment.dateOfAppointment.getTime());
    const end =
      availability.end ?? new Date(appointment.dateOfAppointment.getTime());
    if (!availability) {
      start.setUTCHours(0, 0, 0, 0);
      end.setUTCHours(23, 59, 59, 999);
    }
    const slots = getSlots(start, end, 30);

    const appointments = await Appointment.find({
      doctorId: appointment.doctorId,
      dateOfAppointment: {
        $gte: start,
        $lt: appointment.dateOfAppointment,
      },
    }).sort({ dateOfAppointment: 1 });

    // filter out completed appointments
    const filteredAppointments = appointments.filter(
      (appointment) => appointment.status !== AppointmentStatuses.COMPLETED
    );

    // find in progress appointment
    const inProgressAppointment = filteredAppointments.find(
      (appointment) => appointment.status === AppointmentStatuses.IN_PROGRESS
    );

    const slotIndexOfInProgressAppointment = getSlotIndex(
      slots,
      inProgressAppointment?.dateOfAppointment
    );

    const slotIndexOfAppointment = getSlotIndex(
      slots,
      appointment.dateOfAppointment
    );

    // calculate estimated wait time
    const estimatedWaitTime = inProgressAppointment
      ? filteredAppointments.length * 30
      : differenceInMinutes(appointment.dateOfAppointment, new Date());

    return res.status(StatusCodes.OK).json({
      type: "success",
      status: true,
      message: "Appointment found",
      data: { appointment },
      est: estimatedWaitTime,
      inProgressAppointment: inProgressAppointment
        ? slotIndexOfInProgressAppointment + 1
        : null,
      appointment: slotIndexOfAppointment + 1,
    });
  } catch (error) {
    console.log({ error });
    return res.status(400).json({
      type: "error",
      status: false,
      message: error.message,
    });
  }
};
