import prisma from "../../../config"

const createVideoFromDB =async (payload:any)=>{
const result =await prisma.video.create({
    data:payload
})
return result
}
const getAllVideosIntoDB =async ()=>{
const result =await prisma.video.findMany({
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