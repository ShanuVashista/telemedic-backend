import { Schema, model} from "mongoose";

const AppointmentSchema: Schema = new Schema(
  {
    appointmentId: { type: Schema.Types.ObjectId },
    userId: { type: String, required: true },
    // doctorId: { type: Number, required: true },
    doctor: {type: Schema.Types.ObjectId, ref:'users'},
    appointmentType: { type: String, required: true },
    dateOfAppointment: { type: Date, required: true },
    status: { default: "Pending", type: String, required: true },
    isEmergency: { default: false, type: Boolean, required: true },
    Meta: { type: String },
  },
  { timestamps: true }
);

const Appointment = model(
  "Appointment",
  AppointmentSchema
);

export default Appointment;