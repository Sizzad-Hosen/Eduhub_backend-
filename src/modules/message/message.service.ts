import { ChatModel } from "../chat/chat.model";
import { MessageModel } from "./message.model";


export const getChatMessages = async (chatId: string, limit = 50) => {

  return MessageModel.find({ chat: chatId })
    .sort({ createdAt: 1 })  
    .limit(limit)
    .populate('sender', 'username avatar');
};

export const sendMessage = async (receiverId: string, senderId: string, text: string) => {
    // Find chat between sender and receiver
  let chat = await ChatModel.findOne({ participants: { $all: [receiverId,senderId, ] } });

  if (!chat) {
    // Create new chat if not found
    chat = await ChatModel.create({
      participants: [senderId, receiverId],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } else {
    // Update chat's updatedAt timestamp
    chat.updatedAt = new Date();
    await chat.save();
  }
  
    await ChatModel.findByIdAndUpdate(receiverId, { updatedAt: new Date() });

  // Create message linked to chat
  const message = await MessageModel.create({
    chat: chat._id,
    sender: senderId,
    text,
    readBy: [senderId],
  });

  return message;

 
};


export const markMessagesRead = async (chatId: string, userId: string) => {
  return MessageModel.updateMany(
    { chat: chatId, readBy: { $ne: userId } },
    { $push: { readBy: userId } }
  );
};


export const MessageServices = {
    getChatMessages,
    sendMessage,
    markMessagesRead,
   
}