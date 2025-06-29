import mongoose, { isValidObjectId } from "mongoose";
import { ChatModel } from "./chat.model";


const getUserChats = async (userId: string) => {
console.log("service userId", userId)
 
const result = await ChatModel.find({
    participants: userId,
  }).populate("participants", "name email profileImg role")
    .sort({ updatedAt: -1 });
    console.log("result",result)
return result
};


const getChatByParticipants = async (senderId:string, receiverId:string) => {
  console.log("senderId:", senderId);
  console.log("receiverId:", receiverId);

  const chat = await ChatModel.findOne({
    participants: { $all: [senderId, receiverId] },
    $expr: { $eq: [{ $size: "$participants" }, 2] }
  }).populate("participants", "name email profileImg role");

  console.log("Found chat:", chat);

  return chat;
};

export const ChatServices = {
 
  getUserChats,
  getChatByParticipants
};
