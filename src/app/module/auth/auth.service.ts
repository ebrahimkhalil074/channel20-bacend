
import bcrypt from 'bcryptjs';



import emailSender from "./emailSender";
import prisma from '../../../config';
import { jwtHelpers } from '../../../helpers/generateToken';
import configEnv from '../../../config.env';
import jwt from 'jsonwebtoken';
import { User } from '../../../../generated/prisma';





const loginUser = async(payload:any)=>{
    console.log(payload);
const userData = await prisma.user.findFirstOrThrow({
    where:{
        email: payload.email,
       
    }
})
const isPasswordMatchd= bcrypt.compareSync( payload.password,userData.password); // true
console.log(isPasswordMatchd)

if(!isPasswordMatchd){
    throw new Error("Invalid credentials")
}
const jwtPayload = {
    role:userData.role,
    email:userData.email
}
const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    process.env.jwt_access_secret as string,
    process.env.jwt_access_expires_in as string
  );
  

const refreshToken =jwtHelpers.generateToken(jwtPayload,process.env.jwt_refresh_secret as string,process.env.jwt_access_expires_in as string);
return {
    accessToken,
    refreshToken,
    
}
}
const refreshToken=async(token:string)=>{
    console.log(token)
const decodetToken = jwtHelpers.verifyToken(token,process.env.jwt_refresh_secret as string)

const user = await prisma.user.findFirstOrThrow({
    where:{
        email:decodetToken.email
       
    }
})
const accessToken =jwtHelpers.generateToken(
    {email:user.email,
    role:user.role
},process.env.jwt_access_secret as string,process.env.jwt_access_expires_in as string);

console.log('ref',{accessToken})
return {
    accessToken,
    
}

}
const changePassword =(user:User,payload:any)=>{
// match password
const isPasswordMatchd= bcrypt.compareSync( payload.oldPassword,user.password); // true
console.log("match password",isPasswordMatchd)

if(!isPasswordMatchd){
    throw new Error("Invalid credentials")
}
// hash the password
const salt = bcrypt.genSaltSync(10);
const hashPassword = bcrypt.hashSync(payload.newPassword, salt);
console.log(hashPassword)

// update the password

return prisma.user.update({
    where:{
        email:user.email
    },
    data:{
        password:hashPassword,
       
    }
})

}

const forgatedPassword =async(payload:any)=>{
    const user =await prisma.user.findUniqueOrThrow({
        where: {
         email: payload.email,
         
        },
      })
    
    const resetPasswordToken = jwtHelpers.generateToken(user,configEnv.jwt_reset_secret as string,process.env.jwt_access_expires_in as string)
    
   console.log(resetPasswordToken)
//http://localhost:3000/reset-pass?id=user.id&token=token  
  const resetPasswordLink =`${configEnv.reset_pass_ui_link }id=${user.id}&token=${resetPasswordToken}`
    
  console.log(resetPasswordLink)
  emailSender(user.email,
    `
    <div>
    <h2>Helo Dear</h2>
    <p>Your Reset Password Link
    <a href=${resetPasswordLink}>
    <button>Reset Password</button>
    </a>
    </p>

    </div>
    `
  )
    }

    const resetPassword =async (token:string,payload:{id:string,password:string})=>{
console.log(token,payload)
const user = await prisma.user.findFirstOrThrow({
    where:{
        id:payload.id,
        
    }
})


        // validate token
        const decodetToken = jwtHelpers.verifyToken(token,configEnv.jwt_reset_secret as string)
        console.log("decoded token",decodetToken)
        if(!decodetToken){
            throw new Error("Invalid token")
        }
        // hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(payload.password, salt);
        console.log(hashPassword)
        // update the password
        return prisma.user.update({
            where:{
                id:user.id
            },
            data:{
                password:hashPassword
            }
        })
       
    }
export const authServices ={
    loginUser,
    refreshToken,
    changePassword,
    forgatedPassword,
    resetPassword
}