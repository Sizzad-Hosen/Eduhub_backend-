import { TStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { UserModel } from "./user.model";
import { TUser } from "./user.interface";
import config from "../../app/config";

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

export const UserServices = {
  createStudentService,
};
