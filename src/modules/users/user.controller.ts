import { Request, Response } from "express";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { UserServices } from "./user.service";
import httpStatus from "http-status";

export const createStudentController = catchAsync(async (req: Request, res: Response) => {
  
    const result = await UserServices.createStudentService(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Successfully created student account and profile",
    data: result,
  });
});



export const UserControllers = {

 createStudentController,

}


