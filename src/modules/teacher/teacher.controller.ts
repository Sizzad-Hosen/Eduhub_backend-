import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from "http-status";
import { TeacherServices } from "./teacher.service";

// Controller to get all teachers
export const getAllTeacherController = catchAsync(async (req, res) => {
  const teachers = await TeacherServices.getAllTeacherService(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Teachers retrieved successfully",
    data: teachers,
  });
});

// Controller to update a teacher by ID
export const updateTeacherController = catchAsync(async (req, res) => {
  const { teacherId } = req.params;
  const payload = req.body;

  const updatedTeacher = await TeacherServices.updateTeacherService(teacherId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Teacher updated successfully",
    data: updatedTeacher,
  });
});



export const TeacherControllers = {
    getAllTeacherController,
    updateTeacherController,

}