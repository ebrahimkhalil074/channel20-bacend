import catchAsync from "../../../shered/catchAsync"
import sendResponse from "../../../shered/sendRes"
import { userService } from "./users.services"

const createUser =catchAsync(
    async (req,res)=>{
        const result = await userService.createUserFromDB(req.body)
        sendResponse(res,{
            success: true,
            statusCode:200,
            message: ' user created successfully',
            data: result,
        
        })
    }
)

export const userController ={
    createUser,
    
}