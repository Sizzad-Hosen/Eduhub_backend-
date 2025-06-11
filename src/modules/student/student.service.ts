// src/modules/user/user.service.ts

import { StudentModel } from "./student.model";



export const getAllStudentsService = async () => {

  const students = await StudentModel.find().populate("user"); // populating the linked user info
  
  return students;
};

export const StudentServices = {

  getAllStudentsService,

};
