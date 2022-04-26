import { Schema, model } from "mongoose";

const AppointmentSchema: Schema = new Schema(
  {
    appointmentId: { type: Schema.Types.ObjectId },
    patientId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: 'user' },
    appointmentType: { type: String, required: true },
    dateOfAppointment: { type: Date, required: true },
    status: { default: "Pending", type: String, required: true },
    isEmergency: { default: false, type: Boolean, required: true },
    Meta: { type: String },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

AppointmentSchema.virtual("patient_details", {
  ref: 'user',
  localField: "patientId",
  foreignField: "_id",
  justOne: true,
})

AppointmentSchema.virtual("doctor_details", {
  ref: 'user',
  localField: "doctorId",
  foreignField: "_id",
  justOne: true,
})

const Appointment = model(
  "Appointment",
  AppointmentSchema
);

export default Appointment;
