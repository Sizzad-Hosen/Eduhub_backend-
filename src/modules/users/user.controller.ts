import { Request, Response } from "express";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { UserServices } from "./user.service";
import httpStatus from "http-status";
import AppError from "../../app/config/error/AppError";

export const createStudentController = catchAsync(async (req: Request, res: Response) => {
  
    const result = await UserServices.createStudentService(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Successfully created student account and profile",
    data: result,
  });
});


export const createTeacherController = catchAsync(async (req: Request, res: Response) => {
  
    const result = await UserServices.createTeacherService(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Successfully created teacher account and profile",
    data: result,
  });
});

export const createResearcherController = catchAsync(async (req, res) => {

  const researcher = req.body;

  const result = await UserServices.createResearcherService(researcher);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Researcher created successfully",
    data: result,
  });

});


const getMe = catchAsync(async (req, res) => {

  const token = req.headers.authorization;

console.log(" token:", token);

  if (!token) {
    throw new AppError(httpStatus.NOT_FOUND, 'Token not found!');
  }

  const accessToken = token.replace(/^Bearer\s/, ''); // ✅ Remove "Bearer "

  const result = await UserServices.getMe(accessToken); // 🔥 Use cleaned token

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});


export const UserControllers = {

 createStudentController,
 createTeacherController ,
 createResearcherController,
 getMe

}


