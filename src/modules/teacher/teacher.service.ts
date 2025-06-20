import QueryBuilder from "../../app/builder/QueryBuilder";
import { teacherSearchableFields } from "./teacher.constant";
import { TTeacher } from "./teacher.interface";
import { TeacherModel } from "./teacher.model";

export const getAllTeacherService = async (query?: any) => {

    const teacherQuery = new QueryBuilder(
      TeacherModel.find().populate('user'),
      query
    )
    .search(teacherSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
    console.log(teacherQuery);

    const result = await teacherQuery.modelQuery;
    return result;
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