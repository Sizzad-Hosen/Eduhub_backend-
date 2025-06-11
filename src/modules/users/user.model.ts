import mongoose, { Schema } from "mongoose";


// Mongoose schema
const userSchema: Schema<TUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "teacher", "researcher"],
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);


export const UserModel = mongoose.model<TUser>("User", userSchema);
