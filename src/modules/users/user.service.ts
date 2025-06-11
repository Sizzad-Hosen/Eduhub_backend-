import { TStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { UserModel } from "./user.model";
import { TUser } from "./user.interface";
import config from "../../app/config";
import { TTeacher } from "../teacher/teacher.interface";
import { TeacherModel } from "../teacher/teacher.model";
import { TResearcher } from "../researcher/researcher.interface";
import { ResearcherModel } from "../researcher/researcher.model";

export const createStudentService = async (studentData: TStudent) => {
  // 1. Construct user data from student
  const userData: TUser = {
    name: studentData.name,
    email: studentData.email,
    password: studentData.password || config.default_password,
    role: "student",
  };

  // 2. Check for existing user
  const existingUser = await UserModel.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  // 3. Create user
  const newUser = await UserModel.create(userData);


  console.log("new user", newUser);

  // 4. Link student to user
  studentData.user = newUser._id;

  // 5. Create student profile
  const newStudent = await StudentModel.create(studentData);


  return {
    newStudent
  };
};


export const createTeacherService = async (teacherData: TTeacher) => {
  // 1. Construct user data from teacher
  const userData: TUser = {
    name: teacherData.name,
    email: teacherData.email,
    password: teacherData.password || config.default_password,
    role: "teacher",
    isDeleted: false
  };

  // 2. Check for existing user
  const existingUser = await UserModel.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  // 3. Create user
  const newUser = await UserModel.create(userData);

  // 4. Link teacher to user
  teacherData.user = newUser._id;

  // 5. Create teacher profile
  const newTeacher = await TeacherModel.create(teacherData);

  return {
    user: newUser,
    teacher: newTeacher,
  };
};


export const createResearcherService = async (researcherData: TResearcher) => {
  const userData: TUser = {
    name: researcherData.name,
    email: researcherData.email,
    password: researcherData.password || config.default_password,
    role: "researcher",
  };

  const existingUser = await UserModel.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const newUser = await UserModel.create(userData);
  researcherData.user = newUser._id;

  const newResearcher = await ResearcherModel.create(researcherData);

  return {
    newResearcher,
  };
};



export const UserServices = {
  createStudentService,
  createTeacherService,
  createResearcherService
};
