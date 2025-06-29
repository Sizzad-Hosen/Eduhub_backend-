import { Document, Types } from 'mongoose';

export interface IChat extends Document {
  participants: Types.ObjectId[];  // users in the chat
  lastMessage?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

