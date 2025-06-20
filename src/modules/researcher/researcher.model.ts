import mongoose, { Schema, Document } from "mongoose";
import { Address, TResearcher } from "./researcher.interface";


const addressSchema = new Schema<Address>(
  {
    city: { type: String, required: true },
    homeTown: { type: String, required: true },
    presentAddress: { type: String, required: true },
  },
  { _id: false }
);

const researchPaperSchema = new Schema(
  {
    title: { type: String, required: true },
    url: { type: String },
    pdfFile: { type: String },
  },
  { _id: false }
);

const researcherSchema = new Schema<TResearcher>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    number: { type: String, required: true },
    password:{ type: String, required: true },
    address: { type: addressSchema, required: true },
    expertise: { type: String, required: true },
    experience: { type: String, required: true },
    skill: { type: [String], required: true },
    bsc: { type: String, required: true },
    msc: { type: String },
    phd: { type: String },
    currentlyWorkingAt: { type: String },
    bio: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    profileImg: { type: String },
    researchArea: { type: String },
    researchPaper: [researchPaperSchema],
  },
  { timestamps: true }
);

export const ResearcherModel = mongoose.model<TResearcher>("Researcher", researcherSchema);
