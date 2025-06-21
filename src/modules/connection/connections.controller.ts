import { Request, Response } from "express";
import { ConnnectionServices } from "./connections.service";
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";

// POST /api/connections/send
export const sendConnectionRequest = catchAsync(async (req: any, res: Response) => {
  const senderId = req.user.userId;
  const { receiverId } = req.body;

  console.log("body",req.body);
  console.log("req.user", req.user.userId);


  const result = await ConnnectionServices.sendConnection(senderId, receiverId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Connection request sent successfully",
    data: result,
  });
});


export const ConnectionControllers = {
    sendConnectionRequest
}