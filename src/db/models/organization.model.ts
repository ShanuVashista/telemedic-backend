import mongoose from "mongoose";

const OrganizationSchema = new mongoose.Schema(
  {
    name: { type: String },
    type: { type: String, enum: ['Clinic','Insurance Company'] },
    location: { type: Object },
    contact_person: { type: String },
    status: { type: String }
  },
  {
    timestamps: true,
  }
);

const Organization = mongoose.model("organization", OrganizationSchema);
export default Organization;
