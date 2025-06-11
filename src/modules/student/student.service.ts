// src/modules/user/user.service.ts

import { TStudent } from "./student.interface";
import { StudentModel } from "./student.model";



export const getAllStudentsService = async () => {

  const students = await StudentModel.find().populate("user"); // populating the linked user info

  return students;
};


export const updateStudentService = async (id: string, payload: Partial<TStudent>) => {

  const updatedStudent = await StudentModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate("user");

  if (!updatedStudent) {
    throw new Error("Student not found");
  }

  return updatedStudent;
};


export const StudentServices = {

  getAllStudentsService,
  updateStudentService

};
