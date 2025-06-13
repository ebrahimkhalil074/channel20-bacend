import { json, Request, Response } from 'express';
import catchAsync from "../../../shered/catchAsync";
import { newsService } from './news.services';
import sendResponse from '../../../shered/sendRes';
import { StatusCodes } from 'http-status-codes';
import { fileUploder } from '../../../helpers/fileUploder';
import pick from '../../../shered/pick';

const createNews =catchAsync(async(req:Request& {user?:any},res:Response)=>{
    const data = JSON.parse(req.body.data);
    console.log(
      data
    )
    const user =req.user
    console.log(user)
    const file =req.file
    console.log({file})
    const image =await fileUploder.uploadToCloudinary(file);
    console.log(image)
    const result = await newsService.createNewsFromDB(data,image,user);
    sendResponse(res,{
      success:true,
      statusCode: StatusCodes.OK,
       message: 'news created successfully',
       data: result
    })

})
const getAllNews =catchAsync(async(req:Request,res:Response)=>{
  console.log('hi')
    const query =req.query
    const filteredData = pick(query, [ 'category','searchTerm','createdAt' ]);
    const result = await newsService. getAllNewsIntoDB(query,filteredData);
    sendResponse(res,{
      success:true,
      statusCode: StatusCodes.OK,
       message: 'all news rectrive sucessfully',
       data: result
    })

})
const getNews =catchAsync(async(req:Request,res:Response)=>{
    const {id}=req.params
    const result = await newsService. getNewsByIdIntoDB(id);
    sendResponse(res,{
      success:true,
      statusCode: StatusCodes.OK,
       message: 'all news rectrive sucessfully',
       data: result
    })

})


export const newsController ={
createNews,
getAllNews,
getNews
}