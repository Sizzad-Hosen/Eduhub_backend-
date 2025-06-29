import { z } from 'zod';


export const createChatSchema = z.object({
body:z.object({
      participants: z
    .array(z.string().length(24, "Invalid ObjectId"))
    .length(2, "Chat must have exactly two participants"),
})
});



export const ChatValidationSchemas = {
    createChatSchema
}