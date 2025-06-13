import AppError from "../../app/config/error/AppError";
import { User } from "../users/user.model";
import { TLoginUser } from "./auth.interface";
import { createToken, verifyToken } from "./auth.utils";
import config from "../../app/config";
import bcrypt from "bcrypt"
import httpStatus from 'http-status';


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

const forgetPassword = async (userId: string) => {
  try {
    // ✅ Check if the user exists
    const user = await User.isUserExistsByCustomId(userId);
 console.log('user', user);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
    }

    // ✅ Check if the user is deleted
    if (user.isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!');
    }

    // ✅ Check if the user is blocked
    if (user.status === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
    }

    // ✅ Generate JWT for password reset
    const jwtPayload = {
      userId: user.id,
      role: user.role,
    };

    console.log(jwtPayload);


    const resetToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      '10m'
    );

 
    const resetLink = `${config.reset_pass_ui_link}/reset-password?id=${user.id}&token=${resetToken}`;
    
    sendEmail(user?.email, resetLink)
  
    console.log('Reset Password Link:', resetLink);
    return resetLink;
  } catch (error) {
    console.error('Error in forgetPassword:', error);
    throw error;
  }
};

const resetPassword = async(payload:{id:string; newPassword:string},token:string)=>{

  
  const user = await UserModel.isUserExistsByCustomId(payload?.id);
  console.log('user', user);
 
     if (!user) {
       throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
     }
 
     if (user.isDeleted) {
       throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!');
     }
 
   
     if (user.status === 'blocked') {
       throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
     }
   // checking if the given token is valid
   const decoded = verifyToken(token, config.jwt_access_secret as string);

if (payload.id !== decoded.userId) {
  console.log(payload.id, decoded.userId);
  throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!');
}

//hash new password
const newHashedPassword = await bcrypt.hash(
  payload.newPassword,
  Number(config.bcrypt_salt_rounds),
);

await UserModel.findOneAndUpdate(
  {
    id: decoded.userId,
    role: decoded.role,
  },
  {
    password: newHashedPassword,
    needsPasswordChange: false,
    passwordChangedAt: new Date(),
  },
);

}

export const AuthServices = { loginUser,refreshToken ,forgetPassword,resetPassword};
