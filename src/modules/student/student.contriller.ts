

// src/modules/user/user.controller.ts

import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from "http-status"; // use this instead of manually writing status codes
import { StudentServices } from "./student.service";


export const getAllStudentsController = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsService();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All students retrieved successfully",
    data: result,
  });
});


export const StudentControllers = {

    getAllStudentsController
    
}