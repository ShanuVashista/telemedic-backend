import { Schema, model, Document } from "mongoose";

export interface IAppointmentDocument extends Document {
  userId: number;
  createdAt: Date;
  doctorId: number;
  status: string;
  dateOfAppointment: Date;
  appointmentType: string;
  isEmergency: boolean;
}

const AppointmentSchema: Schema = new Schema(
  {
    appointmentId: { type: Schema.Types.ObjectId },
    userId: { type: String, required: true },
    doctorId: { type: Number, required: true },
    appointmentType: { type: String, required: true },
    dateOfAppointment: { type: Date, required: true },
    status: { default: "Pending", type: String, required: true },
    isEmergency: { default: false, type: Boolean, required: true },
    Meta: { type: String },
  },
  { timestamps: true }
);

const Appointment = model<IAppointmentDocument>(
  "Appointment",
  AppointmentSchema
);

export default Appointment;
