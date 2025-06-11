import { z } from "zod";


const userValidation = z.object({
    
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["student", "teacher", "researcher"]),

});



export const UserValidationSchemas = {
    userValidation,

}