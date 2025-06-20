import mongoose, { Schema } from "mongoose";
import { Address, TTeacher } from "./teacher.interface";


const addressSchema = new Schema<Address>(
  {
    city: { type: String, required: true },
    homeTown: { type: String, required: true },
    presentAddress: { type: String, required: true },
  },
  { _id: false }
);

const teacherSchema = new Schema<TTeacher>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    number: { type: String, required: true },
    address: { type: addressSchema, required: true },
    password:{type:String, required:true},
    expertise:{type:String, required:true},
    experience: { type: String, required: true },
    skill: { type: [String], required: true },
    bsc: { type: String, required: true },
    msc: { type: String },
    phd: { type: String },
    currentlyWorkingAt: { type: String },
    bio: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    profileImg: { type: String },
  },
  { timestamps: true }
);

export const TeacherModel = mongoose.model<TTeacher>("Teacher", teacherSchema);
