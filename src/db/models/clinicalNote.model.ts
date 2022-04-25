import { Schema, model} from "mongoose";

const clinicalNoteSchema: Schema = new Schema(
  {
    doctorId : { type: String, required: true },
    subjective: { type: String, required: true },
    objective: { type: String, required: true },
    assessment: { type: String, required: true },
    plan: { type: String, required: true },
    patientId :{ type: String, required: true },
    eventOutcome :{ type: String, required: true },
  },
  { timestamps: true }
);

const clinicalNote = model(
  "clinicalNote",
  clinicalNoteSchema
);

export default clinicalNote;
