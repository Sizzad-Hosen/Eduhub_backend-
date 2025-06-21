import { z } from "zod";

export const connectionRequestZodSchema = z.object({
    body:z.object({
receiverId: z.string().min(1, "Receiver ID is required").regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId"),

    })
  
});

export const connectionRespondZodSchema = z.object({
  action: z.enum(["accepted", "rejected"], {
    required_error: "Action is required",
    invalid_type_error: "Action must be either 'accepted' or 'rejected'",
  }),
});


export const ConnectionValidation = {
    connectionRequestZodSchema
}