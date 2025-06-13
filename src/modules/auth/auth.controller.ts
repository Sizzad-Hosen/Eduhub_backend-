import { config } from "dotenv";
import catchAsync from "../../app/utils/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from 'http-status';

const loginUser = catchAsync(async (req, res) => {

  console.log('body',req.body)
  const result = await AuthServices.loginUser(req.body);
  console.log('res',result)
  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully!',
    data: {
      accessToken,
    
    },
  });
});


const refreshToken = catchAsync(async(req,res)=>{
  const {refreshToken} = req.cookies;


  const result =  await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved successfully!',
    data: result,
  });
});


const forgetPassword = catchAsync(async(req,res)=>{
  
 const userEmail = req.body.email;

  console.log('userData', userEmail);

  const result = await AuthServices.forgetPassword(userEmail);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reset link is generated successfully!',
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;


  const result = await AuthServices.resetPassword(req.body, token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password reset successfully!",
    data: result,
  });
});
export const AuthControllers = {
  loginUser,
  refreshToken,
  forgetPassword,
  resetPassword
}