import { Request,Response, RequestHandler, NextFunction } from "express"

const catchAsync =(fn:RequestHandler)=>{
return async( req:Request,res:Response,next:NextFunction)=>{
try {
   return await fn(req,res,next)
} catch (error) {
    next(error)
}
}

}
export default catchAsync