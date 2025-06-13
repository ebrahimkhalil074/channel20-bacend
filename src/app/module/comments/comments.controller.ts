import {  Request, Response } from 'express';
import catchAsync from "../../../shered/catchAsync";
import sendResponse from '../../../shered/sendRes';
import { StatusCodes } from 'http-status-codes';
;

import { jwtHelpers } from '../../../helpers/generateToken';
import configEnv from '../../../config.env';
import { User } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import { commentService } from './comment.service';

// const createLikes =catchAsync(async(req:Request&{user?:any},res:Response)=>{
//   const token =req.headers.authorization;
//   if (!token) {
//     throw new Error("token nai")
//   }
//        const verifiedUser =jwtHelpers.verifyToken(token,configEnv.jwt_access_secret as string)
              
//     const {id} =req.params
   
  
//      const anonymousId =  req.body.anonymousId;
// console.log(id,anonymousId,verifiedUser)
//     const result = await likeService.createLikesFromDB(id,anonymousId,verifiedUser)
//     sendResponse(res,{
//       success:true,
//       statusCode: StatusCodes.OK,
//        message: 'Likes created successfully',
//        data: result
//     })

// })
export const createComment = catchAsync(
  async (req, res: Response) => {
    console.log('CLICK')
 

    // ✅ Step 3: Get ID from req.params (it could be either newsId or videoId)
    const { id } = req.params;

    // ✅ Step 4: Get type (to identify whether it's news or video)
    const { type, anonymousId,content } = req.body;
let verifiedUser: JwtPayload = {};

if (!anonymousId) {
  const token = req.headers.authorization;
  if (token) {
    verifiedUser = jwtHelpers.verifyToken(
      token as string,
      configEnv.jwt_access_secret as string
    );
  }
}
    if (!anonymousId) {
      throw new Error('Anonymous ID is missing');
    }

    if (!type || (type !== 'news' && type !== 'video')) {
      throw new Error("Invalid type. Must be either 'news' or 'video'");
    }

    // ✅ Step 5: Prepare proper argument for DB logic
    const newsId = type === 'news' ? id : undefined;
    const videoId = type === 'video' ? id : undefined;

    // ✅ Step 6: Call service function
    const result = await commentService.createCommentFromDB(
      newsId,
      videoId,
      anonymousId,
      content,
      verifiedUser
    );

    // ✅ Step 7: Send response
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message:'comment created successfully',
      data: result, 
    });
  }
);
const getAllComment =catchAsync(async(req:Request,res:Response)=>{
    const query =req.query
    const result = await commentService.getAllCommentIntoDB(query);
    sendResponse(res,{
      success:true,
      statusCode: StatusCodes.OK,
       message: 'all Likes rectrive sucessfully',
       data: result
    })

})
const getComment =catchAsync(async(req:Request,res:Response)=>{
    const {id}=req.params
    const result = await commentService.getCommentByIdIntoDB(id);
    sendResponse(res,{
      success:true,
      statusCode: StatusCodes.OK,
       message: 'all Likes rectrive sucessfully',
       data: result
    })

})


export const commentController ={
createComment,
getAllComment,
getComment
}