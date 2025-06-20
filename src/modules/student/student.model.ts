
import mongoose, { Schema } from "mongoose";
import { Address, TStudent } from "./student.interface";

const addressSchema = new Schema<Address>({
  city: { type: String, required: true },
  homeTown: { type: String, required: true },
  presentAddress: { type: String, required: true },
});

const studentSchema = new Schema<TStudent>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: addressSchema, required: true },
    experience: { type: String, required: true },
    skill:  [{ type: String, required: true }],
    university: { type: String, required: true },
    bio: { type: String, required: true },
    work: { type: String },
    user: { 
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
          unique: true
         },

    academicInterests: [{ type: String }],
    course: { type: String },
    connectRequests: [{ type: String }],
    profileImg: { type: String },
  },
  { timestamps: true }
);

export const StudentModel = mongoose.model<TStudent>("Student", studentSchema);