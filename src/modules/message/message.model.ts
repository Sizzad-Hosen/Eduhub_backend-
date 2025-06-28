// models/Message.ts
import mongoose, { Schema } from 'mongoose';
import { IMessage } from './message.interface';

const MessageSchema = new Schema<IMessage>({
  chat: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  readBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: { createdAt: true, updatedAt: false } });

export const MessageModel =  mongoose.model<IMessage>('Message', MessageSchema);
