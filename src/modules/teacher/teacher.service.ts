import QueryBuilder from "../../app/builder/QueryBuilder";
import { sendImageToCloudinary } from "../../app/utils/sendImageToCloudinary";
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

  // Count total docs based on filter
  await teacherQuery.countTotal();

  // Execute paginated query
  const result = await teacherQuery.modelQuery;

  return {
    data: result,
    meta: {
      total: teacherQuery.total,
      page: teacherQuery.page,
      limit: teacherQuery.limit,
      totalPages: teacherQuery.totalPages,
    },
  };
};



export const updateTeacherService  = async (id: string, payload: Partial<TTeacher>,file:any) => {

  // ✅ Find existing student
  const userData = await TeacherModel.findById(id).populate("user");
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
  const updatedTeacher = await TeacherModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate("user");

  if (!updatedTeacher) {
    throw new Error("Teacher not found");
  }

  return updatedTeacher;
};

const getSingelTeacherService = async (id: string) => {

  const student = await TeacherModel.findById(id).populate('user');

  if (!student) {
    throw new Error("Student not found");
  }

  return student;
}


export const TeacherServices = {
    getAllTeacherService,
    updateTeacherService,
    getSingelTeacherService
}