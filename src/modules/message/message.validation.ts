// validation/messageValidation.ts
import { z } from 'zod';

export const createMessageSchema = z.object({
body:z.object({
    chat: z.string().length(24, 'Invalid chat id'),  // assuming Mongo ObjectId string
  sender: z.string().length(24, 'Invalid sender id'),
  text: z.string().min(1, 'Message text is required'),
})
});


export const MessageSchema = {
    createMessageSchema
}