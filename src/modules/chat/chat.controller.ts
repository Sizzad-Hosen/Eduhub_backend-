import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ChatServices } from './chat.service';
import sendResponse from '../../app/utils/sendResponse';
import catchAsync from '../../app/utils/catchAsync';




export const   getUserChats= catchAsync(async (req, res) => {

  if (!req.user || !req.user.userId) {
    return sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'User not authenticated',
      data: null,
    });
  }

  const userId = req.user.userId;
  console.log("userId",userId)
  
  const chats = await ChatServices.getUserChats(userId);
console.log("controelers chats",chats

)
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User chats retrieved successfully',
    data: chats,
  });
});

export const getUserChatWithReceiver = catchAsync(async (req, res) => {
  if (!req.user || !req.user.userId) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: 'User not authenticated',
      data: null,
    });
  }

  const senderId = req.user.userId;
  const { receiverId } = req.body;

  console.log("body", req.body)
  console.log("senderid",senderId)

  // Call service to find chat
  const chat = await ChatServices.getChatByParticipants(senderId, receiverId);
  return sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Chat retrieved successfully',
    data: chat,
  });
});


export const ChatControllers = {

  getUserChats,
  getUserChatWithReceiver
};