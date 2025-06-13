import { UserRole } from "@prisma/client"
import prisma from "../../../config"
import bcrypt from "bcryptjs"
const createUserFromDB =async (payload:any)=>{
console.log(payload)
const isExist = await prisma.user.findUnique({
    where: { email: payload.email }
})
console.log(isExist)
if(isExist){
    throw new Error("user already exists")
}
const salt = bcrypt.genSaltSync(10);
const hashPassword = bcrypt.hashSync(payload.password, salt);
console.log(hashPassword)
const userData ={... payload,
    role:UserRole.ADMIN,
    password:hashPassword
}
const result = await prisma.user.create({
    data:userData
})
return result
}

export const userService ={
    createUserFromDB,
    // createMemberFromDB,
    // createImamFromDB,
    // createKhotibFromDB,
    // getAllUsersFromDB,
    // getDashbordDataInToDB

}