import { ChatModel } from "../chat/chat.model";
import { MessageModel } from "./message.model";

// Find existing chat between two users or create new
export const findOrCreateChat = async (userId1: string, userId2: string) => {
  const participants = [userId1, userId2].sort();  // ensure order for uniqueness

  let chat = await ChatModel.findOne({ participants });

  if (!chat) {
    chat = await ChatModel.create({ participants });
  }
  return chat;
};


export const getUserChats = async (userId: string) => {
  return ChatModel.find({ participants: userId })
    .populate('participants', 'username avatar role')
    .sort({ updatedAt: -1 });
};

export const getChatMessages = async (chatId: string, limit = 50) => {

  return MessageModel.find({ chat: chatId })
    .sort({ createdAt: 1 })  // oldest first
    .limit(limit)
    .populate('sender', 'username avatar');
};

export const sendMessage = async (chatId: string, senderId: string, text: string) => {
  const message = await MessageModel.create({
    chat: chatId,
    sender: senderId,
    text,
    readBy: [senderId], 
  });


  await ChatModel.findByIdAndUpdate(chatId, { updatedAt: new Date() });

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
    getUserChats,
    markMessagesRead,
    findOrCreateChat
}