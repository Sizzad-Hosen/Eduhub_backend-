import mongoose from 'mongoose';
import { TStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { User } from "./user.model";
import { TUser } from "./user.interface";
import config from "../../app/config";
import { TTeacher } from "../teacher/teacher.interface";
import { TeacherModel } from "../teacher/teacher.model";
import { TResearcher } from "../researcher/researcher.interface";
import { ResearcherModel } from "../researcher/researcher.model";
import { verifyToken } from "../auth/auth.utils";
import AppError from "../../app/config/error/AppError";
import httpStatus from "http-status";


export const createStudentService = async (studentData: TStudent) => {
  // 1. Construct user data from student
  const userData: TUser = {
    name: studentData.name,
    email: studentData.email,
    password: studentData.password || config.default_password,
    role: "student",
  };

  // 2. Check for existing user
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  // 3. Create user
  const newUser = await User.create(userData);


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
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  // 3. Create user
  const newUser = await User.create(userData);

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

  const existingUser = await User.findOne({ email: userData.email });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const newUser = await User.create(userData);
  researcherData.user = newUser._id;

  const newResearcher = await ResearcherModel.create(researcherData);

  return {
    newResearcher,
  };
};


const getMe = async (token: string) => {
  const decoded = verifyToken(token, config.jwt_access_secret as string);
  const { userId, role } = decoded;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid user ID format');
  }

  let result = null;

  if (role === 'student') {
    result = await StudentModel.findOne({ user: userId }).populate('user');
  } else if (role === 'teacher') {
    result = await TeacherModel.findOne({ user: userId }).populate('user');
  } else if (role === 'researcher') {
    result = await ResearcherModel.findOne({ user: userId }).populate('user');
  }

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  return result;
};

export const findMatchesByRole = async (userId: string, role: string) => {
  let userData: any;

  if (role === "student") {
    userData = await StudentModel.findOne({ user: userId });
  } else if (role === "teacher") {
    userData = await TeacherModel.findOne({ user: userId });
  } else if (role === "researcher") {
    userData = await ResearcherModel.findOne({ user: userId });
  } else {
    throw new Error("Invalid role");
  }

  if (!userData) throw new Error("User data not found");

  const { address, skill = [], academicInterests = [], expertise = "", researchArea = "" } = userData;
  const city = address?.city;

  // Build exact-match conditions
  const matchConditions = [
    { "address.city": city },
    ...(skill.length ? [{ skill: { $in: skill } }] : []),
    ...(academicInterests.length ? [{ academicInterests: { $in: academicInterests } }] : []),
    ...(expertise      ? [{ expertise }]       : []),
    ...(researchArea   ? [{ researchArea }]    : []),
  ];

  const filter = {
    _id: { $ne: userData._id },
    $or: matchConditions,
  };

  // Fetch up to 10 matches per role
  const teacherMatches = await TeacherModel.find(filter)
    .limit(10)
    .populate("user");

  const researcherMatches = await ResearcherModel.find(filter)
    .limit(10)
    .populate("user");

  const studentMatches =
    role === "teacher" || role === "researcher"
      ? await StudentModel.find(filter)
          .limit(10)
          .populate("user")
      : [];

  return {
    teachers:   teacherMatches,
    researchers: researcherMatches,
    students:    studentMatches,
  };
};


export const UserServices = {
  createStudentService,
  createTeacherService,
  createResearcherService,
  getMe,
  findMatchesByRole
};
