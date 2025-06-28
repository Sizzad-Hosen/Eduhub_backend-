// models/Chat.ts
import mongoose, { Schema, Types } from 'mongoose';
import { IChat } from './chat.interface';

const ChatSchema = new Schema<IChat>({
  participants: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    validate: [(val: Types.ObjectId[]) => val.length === 2, 'Chat must have exactly two participants'],
    required: true,
  }
}, { timestamps: true });

export const ChatModel =  mongoose.model<IChat>('Chat', ChatSchema);
