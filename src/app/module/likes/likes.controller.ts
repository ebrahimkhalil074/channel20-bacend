import {  Request, Response } from 'express';
import catchAsync from "../../../shered/catchAsync";
import sendResponse from '../../../shered/sendRes';
import { StatusCodes } from 'http-status-codes';
;
import { likeService } from './likes.service';
import { jwtHelpers } from '../../../helpers/generateToken';
import configEnv from '../../../config.env';
import { User } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';

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
export const createLikes = catchAsync(
  async (req, res: Response) => {
    console.log('CLICK')
 
let verifiedUser :JwtPayload = {};
    // ✅ Step 3: Get ID from req.params (it could be either newsId or videoId)
    const { id } = req.params;

    // ✅ Step 4: Get type (to identify whether it's news or video)
    const { type, anonymousId } = req.body;
if (anonymousId === null || undefined) {
   // ✅ Step 1: Get token from headers
    const token = req.headers.authorization;
     

    // ✅ Step 2: Verify the JWT token to get logged-in user (if any)
   verifiedUser = jwtHelpers.verifyToken(
      token as string,
      configEnv.jwt_access_secret as string
    );
}
console.log('CLICK') 
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
    const result = await likeService.createLikesFromDB(
      newsId,
      videoId,
      anonymousId,
      verifiedUser 
    );

    // ✅ Step 7: Send response
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message:
        result.status === 'liked'
          ? 'Liked successfully'
          : 'Unliked successfully',
      data: result, 
    });
  }
);
const getAllLikes =catchAsync(async(req:Request,res:Response)=>{
    const query =req.query
    const result = await likeService. getAllLikesIntoDB(query);
    sendResponse(res,{
      success:true,
      statusCode: StatusCodes.OK,
       message: 'all Likes rectrive sucessfully',
       data: result
    })

})
const getLikes =catchAsync(async(req:Request,res:Response)=>{
    const {id}=req.params
    const result = await likeService. getLikesByIdIntoDB(id);
    sendResponse(res,{
      success:true,
      statusCode: StatusCodes.OK,
       message: 'all Likes rectrive sucessfully',
       data: result
    })

})


export const likeController ={
createLikes,
getAllLikes,
getLikes
}