
import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../config"



// const createLikesFromDB =async (newsId,anonymousId,verifiedUser)=>{
//   const user =await prisma.user.findFirstOrThrow({
//     where:{
//       email:verifiedUser.email
//     }
//   })
//     console.log(user)
//     const existingLike = await prisma.like.findFirst({
//       where: { 
//     newsId,
//     anonymousId,
//     userId:user.id
//       },
//     });
//     console.log(existingLike)
//     if (existingLike) {
//         console.log("Already liked")
// throw new Error("Already liked")
        
//     }
//     const result = await prisma.like.create({
//       data:{
//         userId:user.id,
//         anonymousId,
//         newsId
//       },
//       include:{
//         user:true,
//         news:true
//       }
//     });
//     console.log('like')
//     return result
// }


const createCommentFromDB = async (
  newsId: string | undefined,
  videoId: string | undefined,
  anonymousId: string,
  content:any,
  verifiedUser:JwtPayload
) => {
  let userId = null;

  // ✅ 1. যদি verified user থাকে (login করা), তাহলে userId বের করি
  if (verifiedUser?.email) {
    const user = await prisma.user.findUnique({
      where: { email: verifiedUser.email },
    });
    userId = user?.id;
  }

  // ✅ 2. newsId বা videoId যেকোনো একটা আসা বাধ্যতামূলক
  if (!newsId && !videoId) {
    throw new Error("Either newsId or videoId is required.");
  }

  // ✅ 3. news/video আসলেই আছে কিনা, তা যাচাই
  if (newsId) {
    const newsExists = await prisma.news.findUnique({
      where: { id: newsId },
    });
    if (!newsExists) {
      throw new Error("Invalid newsId: News does not exist.");
    }
  }

  if (videoId) {
    const videoExists = await prisma.video.findUnique({
      where: { id: videoId },
    });
    if (!videoExists) {
      throw new Error("Invalid videoId: Video does not exist.");
    }
  }

  // ✅ 4. আগেই like করা হয়েছে কিনা তা যাচাই
//   const commentCheckWhere = {
//     ...(userId ? { userId } : { anonymousId }),
//     ...(newsId ? { newsId } : {}),
//     ...(videoId ? { videoId } : {}),
//   };

//   const existingComment = await prisma.comment.findFirst({
//     where: commentCheckWhere,
//   });

//   // ✅ 5. যদি like আগে থেকেই থাকে → unlike করে দেই
//   if (existingComment) {
//     await prisma.comment.delete({
//       where: { id: existingComment.id },
//     });

//     return { status: 'unliked', data: existingComment };
//   }

  // ✅ 6. নতুন like তৈরি করি
  const result = await prisma.comment.create({
    data: {
      userId: userId || undefined,
      anonymousId: anonymousId || undefined,
      newsId: newsId || undefined,
      videoId: videoId || undefined,
      content
    },
    include: {
      user: true,
      news: true,
      video: true,
    },
  });

  return result ;
};






const getAllCommentIntoDB =async (payload:any)=>{
    const result =await prisma.like.findMany({})
    return result
}

const getCommentByIdIntoDB =async (id:string)=>{
const result = await prisma.like.findFirstOrThrow({
    where:{
        id
    },
      
    
});
return result
}
export const commentService ={
    createCommentFromDB,
    getAllCommentIntoDB,
    getCommentByIdIntoDB
}