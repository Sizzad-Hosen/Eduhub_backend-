import { TTeacher } from "./teacher.interface";
import { TeacherModel } from "./teacher.model";

export const getAllTeacherService = async () => {

  const teachers = await TeacherModel.find().populate("user"); 

  return teachers;
};


export const updateTeacherService  = async (id: string, payload: Partial<TTeacher>) => {

  const updatedTeacher = await TeacherModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate("user");

  if (!updatedTeacher) {
    throw new Error("Teacher not found");
  }

  return updatedTeacher;
};


export const TeacherServices = {
    getAllTeacherService,
    updateTeacherService
}