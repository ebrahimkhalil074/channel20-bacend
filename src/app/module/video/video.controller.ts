import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shered/catchAsync";
import sendResponse from "../../../shered/sendRes";
import { videoService } from "./video.services";

const createVideo =catchAsync(async(req,res)=>{

    const result =await videoService.createVideoFromDB(req.body);
    sendResponse(res,{
        success:true,
        statusCode:StatusCodes.OK,
        message:"video created successfully",
        data:result
    })
})
const getAllVideos =catchAsync(async(req,res)=>{

    const result =await videoService.getAllVideosIntoDB();
    sendResponse(res,{
        success:true,
        statusCode:StatusCodes.OK,
        message:" all video rectrive successfully",
        data:result
    })
})
const getVideo =catchAsync(async(req,res)=>{

    const result =await videoService.getVideoIntoDB(req.params.id);
    sendResponse(res,{
        success:true,
        statusCode:StatusCodes.OK,
        message:"video rectrive successfully",
        data:result
    })
})

export const videoController ={
createVideo,
getAllVideos,
getVideo
}