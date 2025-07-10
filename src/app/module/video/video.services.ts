import { any } from "zod";
import prisma from "../../../config"
import { Prisma } from '@prisma/client';



const createVideoFromDB =async (payload:any,user:any)=>{
const result =await prisma.video.create({
    data:{
      ...payload,
       authorId:user?.id,
    }
})
return result
}
const getAllVideosIntoDB =async (payload:any,filteredData:any)=>{
  let andConditions:Prisma.VideoWhereInput[] =[];
  if (payload.searchTerm) {
   andConditions.push({
    OR:['category','title'].map(field =>({
      [field]:{
        contains: payload.searchTerm,
        mode: "insensitive",
      }
    }))
   })
  }
  if (Object.keys(filteredData).length < 0) {
    andConditions.push({
      AND:Object.keys(filteredData).map(key =>({
        [key]:filteredData[key]
      }))
    })
  }
  const whereConditions:Prisma.VideoWhereInput= andConditions.length > 0 ? { AND: andConditions } : {};
const result =await prisma.video.findMany({
  where:whereConditions,
  include:{
    category:true,
    comments:true,
    likes:true
  }  
})
return result
}
const getVideoIntoDB =async (id:string)=>{
const result =await prisma.video.findFirstOrThrow({
    where:{
        id
    },
    include:{
    category:true,
    comments:true,
    likes:true
  } 
})
return result
}
export const videoService ={
    createVideoFromDB,
    getAllVideosIntoDB,
    getVideoIntoDB
}