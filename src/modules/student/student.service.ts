// src/modules/user/user.service.ts

import mongoose from "mongoose";
import QueryBuilder from "../../app/builder/QueryBuilder";
import { sendImageToCloudinary } from "../../app/utils/sendImageToCloudinary";
import { studentSearchableFields } from "./student.constant";
import { TStudent } from "./student.interface";
import { StudentModel } from "./student.model";



const getAllStudentsService = async (query: Record<string, unknown>) => {

  const studentQuery = new QueryBuilder(StudentModel.find()
  .populate('user')    
  , query)
  .search(studentSearchableFields)
  .filter()
  .sort()
  .paginate()
  .fields()
console.log(studentQuery)

  const result = await studentQuery.modelQuery;
  return result;

};


export const updateStudentService = async (
  id: string,
  payload: Partial<TStudent>,
  file?: any
) => {
  console.log('[10] Update Student Service called with ID:', id, 'and payload:', payload);

  // ✅ Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }

  // ✅ Find existing student
  const userData = await StudentModel.findById(id).populate("user");
  if (!userData) {
    throw new Error("Student not found");
  }

  // ✅ File Upload
  if (file) {
    console.log('[11] Starting file upload...');
    const imageName = `${userData._id}_${payload?.name || userData.name}`;
    const { secure_url } = await sendImageToCloudinary(imageName, file.path);
    payload.profileImg = secure_url;
  }

  // ✅ Update
  const updatedStudent = await StudentModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate("user");

  if (!updatedStudent) {
    throw new Error("Failed to update student");
  }

  return updatedStudent;
};


export const StudentServices = {

  getAllStudentsService,
  updateStudentService

};
