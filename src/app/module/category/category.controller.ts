import prisma from "../../../config"
import catchAsync from "../../../shered/catchAsync"
import pick from "../../../shered/pick"
import sendResponse from "../../../shered/sendRes"
import { categoryService } from "./category.service"

const createCategory = catchAsync(
    async (req,res)=>{
    
    const result =await  categoryService.createCategoryFromDB(req.body)
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:'category created sucessfully',
        data:result
    })
}) 

const getAllCategory = catchAsync(
    async (req,res)=>{
        const query =req.query
    const filteredData = query
    console.log({filteredData})
    const result =await  categoryService.getAllCategoryFromDB(req.query,filteredData)
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:'all category rectrive sucessfully',
        data:result
    })
}) 
export const categoryController ={

    createCategory,
    getAllCategory
}