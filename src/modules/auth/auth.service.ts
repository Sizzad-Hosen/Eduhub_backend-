import AppError from "../../app/config/error/AppError";
import { User } from "../users/user.model";
import { TLoginUser } from "./auth.interface";
import { createToken, verifyToken } from "./auth.utils";
import config from "../../app/config";
import bcrypt from "bcrypt"
import httpStatus from 'http-status';
import { sendEmail } from "../../app/utils/sendEmail";


const loginUser = async (payload: TLoginUser) => {
  const { email, password } = payload;

  // Step 1: Find user by email and include password field
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // Step 2: Check if password matches
  const isPasswordMatched = await User.isPasswordMatched(
    password,
    user.password
  );


  console.log("user pass", user.password);
  console.log("password login", password)

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Password does not match!');
  }

  // Step 3: Token Payload
  const jwtPayload = {
    userId: user._id.toString(),
    role: user.role,
  };

  // Step 4: Create tokens
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in
  );

  // Step 5: Return tokens
  return {
    accessToken,
    refreshToken,
  };
};

export default loginUser;


const refreshToken = async (token: string) => {
  
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { userEmail, iat } = decoded;

  // checking if the user is exist
  const user = await User.findOne(userEmail);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  
  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };
  
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

const forgetPassword = async (userEmail: string) => {
  try {
    // ✅ Check if the user exists
    const user = await User.findOne({ email: userEmail });
    console.log('user', user);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
    }

    // ✅ Generate JWT for password reset
    const jwtPayload = {
      userEmail: user.email,
      role: user.role,
    };

    console.log('JWT Payload:', jwtPayload);

    const resetToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      '10m'
    );

    const resetLink = `${config.reset_pass_ui_link}/reset-password?email=${user.email}&token=${resetToken}`;
    
    await sendEmail(user.email, resetLink);
  
    console.log('Reset Password Link:', resetLink);
    return resetLink;
  } catch (error) {
    console.error('Error in forgetPassword:', error);
    throw error;
  }
};


const resetPassword = async(payload:{email:string; newPassword:string},token:string)=>{

  
  const user = await User.findOne(payload?.email);
  console.log('user', user);
 
     if (!user) {
       throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
     }
 
     
   // checking if the given token is valid
   const decoded = verifyToken(token, config.jwt_access_secret as string);

if (payload.email !== decoded.userEmail) {

  console.log(payload.email, decoded.userId);

  throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!');
}

//hash new password
const newHashedPassword = await bcrypt.hash(
  payload.newPassword,
  Number(config.bcrypt_salt_rounds),
);

await User.findOneAndUpdate(
  {
    email: decoded.userEmail,
    role: decoded.role,
  },

  {
    password: newHashedPassword,
    passwordChangedAt: new Date(),
  },
);

}

export const AuthServices = { loginUser,refreshToken ,forgetPassword,resetPassword};

