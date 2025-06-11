import { z } from "zod";


export const addressValidation = z.object({
  city: z.string().min(1, "City is required"),
  homeTown: z.string().min(1, "HomeTown is required"),
  presentAddress: z.string().min(1, "Present address is required"),
});


export const studentValidation = z.object({
  
  body:z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  number: z.string().min(6, "Number must be at least 6 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  address: addressValidation,
  experience: z.string().min(1, "Experience is required"), // ✅ spelling fixed here
  skill: z.string().min(1, "Skill is required"),
  university: z.string().min(1, "University is required"),
  bio: z.string().min(1, "Bio is required"),
  work: z.string().optional(),
  user: z.string().min(24, "User must be a valid Mongo ObjectId"),
  academicInterests: z.array(z.string()).optional(),
  course: z.string().optional(),
  connectRequests: z.array(z.string()).optional(),
  profileImg: z.string().url("Profile image must be a valid URL").optional()

  })


  
});
export const studentUpdateValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email("Invalid email address").optional(),
    number: z.string().min(6, "Number must be at least 6 characters").optional(),
    password: z.string().min(6, "Password must be at least 6 characters").optional(),
    address: addressValidation.optional(),
    experience: z.string().optional(),
    skill: z.string().optional(),
    university: z.string().optional(),
    bio: z.string().optional(),
    work: z.string().optional(),
    user: z.string().min(24, "User must be a valid Mongo ObjectId").optional(),
    academicInterests: z.array(z.string()).optional(),
    course: z.string().optional(),
    connectRequests: z.array(z.string()).optional(),
    profileImg: z.string().url("Profile image must be a valid URL").optional(),
  }),
});

export const studentValidationSchemas = {
  studentValidation,
  studentUpdateValidation
}