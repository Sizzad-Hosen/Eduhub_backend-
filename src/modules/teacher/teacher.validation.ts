import { z } from "zod";

// MongoDB ObjectId validation (24-character hex string)
const objectIdValidation = z
  .string()
  .length(24, "Invalid ObjectId")
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format");

// Address validation
export const addressValidation = z.object({
  city: z.string().min(1, "City is required"),
  homeTown: z.string().min(1, "Home town is required"),
  presentAddress: z.string().min(1, "Present address is required"),
});

// Teacher validation schema
export const createTeacherValidation = z.object({
 body:z.object({

   name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  number: z.string().min(6, "Phone number must be at least 6 digits"),
  password:z.string().min(6,"password is required"),
  address: addressValidation,
  expertise: z.string().min(1, "Expertise is required"),
  experience: z.string().min(1, "Experience is required"),
  skill: z.string().min(1, "Skill is required"),
  bsc: z.string().min(1, "BSc institution is required"),
  msc: z.string().optional(),
  phd: z.string().optional(),
  currentlyWorkingAt: z.string().optional(),
  bio: z.string().min(1, "Bio is required"),
  user: z.string().min(24, "User must be a valid Mongo ObjectId").optional(),
  profileImg: z.string().optional(),

 })
});


export const TeacherValidationSchemas = {
  createTeacherValidation
}