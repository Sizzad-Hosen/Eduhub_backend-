
import { Document, Types } from 'mongoose';

export interface IMessage extends Document {
  chat: Types.ObjectId; // Chat ID
  sender: Types.ObjectId; // User ID
  text: string;
  readBy: Types.ObjectId[]; // Users who read the message (can be used for receipts)
  createdAt: Date;
}
