
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


const createLikesFromDB = async (
  newsId: string | undefined,
  videoId: string | undefined,
  anonymousId: string,
  verifiedUser: JwtPayload
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
  const likeCheckWhere = {
    ...(userId ? { userId } : { anonymousId }),
    ...(newsId ? { newsId } : {}),
    ...(videoId ? { videoId } : {}),
  };

  const existingLike = await prisma.like.findFirst({
    where: likeCheckWhere,
  });

  // ✅ 5. যদি like আগে থেকেই থাকে → unlike করে দেই
  if (existingLike) {
    await prisma.like.delete({
      where: { id: existingLike.id },
    });

    return { status: 'unliked', data: existingLike };
  }

  // ✅ 6. নতুন like তৈরি করি
  const newLike = await prisma.like.create({
    data: {
      userId: userId || undefined,
      anonymousId: anonymousId || undefined,
      newsId: newsId || undefined,
      videoId: videoId || undefined,
    },
    include: {
      user: true,
      news: true,
      video: true,
    },
  });
console.log(newLike)
  return { status: 'liked', data: newLike };
};






const getAllLikesIntoDB =async (payload:any)=>{
    const result =await prisma.like.findMany({})
    return result
}

const getLikesByIdIntoDB =async (id:string)=>{
const result = await prisma.like.findFirstOrThrow({
    where:{
        id
    },
      
    
});
return result
}
export const likeService ={
    createLikesFromDB,
    getAllLikesIntoDB,
    getLikesByIdIntoDB
}