

// src/modules/user/user.controller.ts

import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from "http-status"; // use this instead of manually writing status codes
import { StudentServices } from "./student.service";


export const getAllStudentsController = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsService(req.query);
console.log(result)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All students retrieved successfully",
    data: {
      data: result.data,   // students list
      meta: result.meta,   // pagination info
    },
  });
});


export const updateStudentController = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const payload = req.body;

  // Clean user field if it's null or unchanged
  if (!payload.user || payload.user === 'null') {
    delete payload.user;
  }
  const result = await StudentServices.updateStudentService(studentId, payload, req.file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student updated successfully",
    data: result,
  });
});

const getSingelStudentController = catchAsync(async (req, res) => {

  const { studentId } = req.params;

  const result = await StudentServices.getSingelStdentService(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student retrieved successfully",
    data: result,
  });
  
});


export const StudentControllers = {

    getAllStudentsController,
    updateStudentController,
    getSingelStudentController

}