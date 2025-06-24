import { Request, Response } from "express";
import { ConnnectionServices } from "./connections.service";
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import { get } from "http";

// POST /api/connections/send
export const sendConnectionRequest = catchAsync(async (req: any, res: Response) => {
  const senderId = req.user.userId;
  const { receiverId } = req.body;
  console.log("reciverId", req.body)

  const result = await ConnnectionServices.sendConnection(senderId, receiverId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Connection request sent successfully",
    data: result,
  });
});
export const recivedConnectionRequest = catchAsync(async (req: any, res: Response) => {

 const receiverId = req.user.userId;
 console.log("receiverId", receiverId);

  const result = await ConnnectionServices.getReceivedConnections(receiverId);
console.log("result", result);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Recieved request successfully",
    data: result,
  });
});

export const respondToConnection = async (req: Request, res: Response) => {

   const { status } = req.body;
    const connectionId = req.params.id;
    console.log("action", req.body);
    console.log("connectionId", connectionId);

    const result = await ConnnectionServices.updateConnectionStatus(connectionId,status);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Connection ${status}ed successfully`,
      data: result,
    });
  
};


export const getConnection = catchAsync(async (req: any, res: Response) => {

      const userId = req.user?.userId
console.log("userId", userId);
    const result = await ConnnectionServices.getRequestConnections(userId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Connection retried successfully`,
      data: result,
    });
  
})


export const ConnectionControllers = {
    sendConnectionRequest,
    recivedConnectionRequest,
    respondToConnection,
    getConnection
}