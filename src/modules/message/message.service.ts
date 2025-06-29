import { ChatModel } from "../chat/chat.model";
import { MessageModel } from "./message.model";


export const getChatMessages = async (chatId: string, limit = 50) => {

  return MessageModel.find({ chat: chatId })
    .sort({ createdAt: 1 })  
    .limit(limit)
    .populate('sender', 'username avatar');
};

export const sendMessage = async (chatId: string, senderId: string, text: string) => {
  
    await ChatModel.findByIdAndUpdate(chatId, { updatedAt: new Date() });
    
  const message = await MessageModel.create({
    chat: chatId,
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