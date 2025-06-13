import { Request,Response,NextFunction } from "express";
import { jwtHelpers } from "../helpers/generateToken";
import configEnv from "../config.env";
import prisma from "../config";

import { StatusCodes } from "http-status-codes";

import apiError from "../errors/apiError";



 const auth =  (...roles :string[])=>{
    return async (req:Request & {user?:any}, res:Response, next:NextFunction) => {
      try {
        const token =req.headers.authorization;
        console.log({token})
        if (!token) {
          throw new apiError(StatusCodes.UNAUTHORIZED,'you are not authorized')
        }
        console.log()
        const verifiedUser =jwtHelpers.verifyToken(token,configEnv.jwt_access_secret as string)
       
        console.log({verifiedUser})
        console.log(roles)
        const user =await prisma.user.findUniqueOrThrow({
          where: {
          email: verifiedUser?.email,
          },
        })
        req.user = user;
        if (!roles.includes(user.role)) {
          throw new apiError(StatusCodes.FORBIDDEN,'forbidden access ')
        }
        next()
      } catch (error) {
        next(error);
      }
        
        
    };
}

export default auth;