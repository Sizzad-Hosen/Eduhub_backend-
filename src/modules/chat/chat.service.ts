import mongoose, { isValidObjectId } from "mongoose";
import { ChatModel } from "./chat.model";


const findOrCreateChat = async (userId1: string, userId2: string) => {
  const sortedUserIds = [userId1, userId2]
    .map(id => new mongoose.Types.ObjectId(id)) // 🔥 Convert strings to ObjectId
    .sort((a, b) => a.toString().localeCompare(b.toString()));

  console.log("sortuser", sortedUserIds);

  const existingChat = await ChatModel.findOne({
    participants: { $all: sortedUserIds }
  }).populate("participants", "name email profileImg role");

  if (existingChat) return existingChat;

  const newChat = await ChatModel.create({
    participants: sortedUserIds,
  });
  console.log("newChat",newChat)

  const populatedChat = await newChat.populate("participants", "name email profileImg role");

  console.log("new chat created", populatedChat);

  return populatedChat;
};

const getUserChats = async (userId: string) => {

  return await ChatModel.find({
    participants: userId,
  }).populate("participants", "name email profileImg role")
    .sort({ updatedAt: -1 });
    
};

export const ChatServices = {
  findOrCreateChat,
  getUserChats,
};
