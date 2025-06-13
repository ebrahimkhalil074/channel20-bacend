import { StatusCodes } from "http-status-codes"

import { authServices } from "./auth.service"
import { Request, Response } from "express"
import catchAsync from "../../../shered/catchAsync"
import sendResponse from "../../../shered/sendRes"


const loginUser = catchAsync( async (req,res)=>{
const result = await authServices.loginUser(req.body)
const {refreshToken}=result;
res.cookie('refreshToken',refreshToken,{
    secure:false,
    httpOnly:true,
    
})
sendResponse(res,{
success:true,
statusCode: StatusCodes.OK,
 message: 'login successfull',
 data: {
    accessToken:result.accessToken,
    refreshToken:result.refreshToken,
    
 }
})
})
const refreshToken = catchAsync( async (req,res)=>{
    const {refreshToken} =req.cookies;
const result = await authServices.refreshToken(refreshToken)

sendResponse(res,{
success:true,
statusCode: StatusCodes.OK,
 message: 'access token get  successfull',
 data: {
    accessToken:result.accessToken,
    
 }
})
})
const changePassword = catchAsync( async (req:Request & {user?:any},res:Response)=>{
const result = await authServices.changePassword(req.user,req.body)

sendResponse(res,{
success:true,
statusCode: StatusCodes.OK,
 message: 'password changed successfully',
 data: result
})
})
const forgatedPassword = catchAsync( async (req:Request,res:Response)=>{
    console.log(req.body)
const result = await authServices.forgatedPassword(req.body)

sendResponse(res,{
success:true,
statusCode: StatusCodes.OK,
 message: 'forgated password  successfully',
 data: result
})
})
const resetPassword = catchAsync( async (req:Request,res:Response)=>{

    const token =req.headers.authorization || ''
    console.log(req.body)
const result = await authServices.resetPassword(token,req.body)

sendResponse(res,{
success:true,
statusCode: StatusCodes.OK,
 message: 'reset password  successfully',
 data: result
})
})
export const authControllers ={
    loginUser,
    refreshToken,
    changePassword,
    forgatedPassword,
    resetPassword
 
}