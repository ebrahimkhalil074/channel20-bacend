
import { Prisma } from "@prisma/client";
import prisma from "../../../config"



const createNewsFromDB =async (payload :any,image:any,user:any)=>{
  console.log(image)
    const result = await prisma.news.create({
        data:{
            ...payload,
            authorId:user?.id,
            image:image.secure_url
        }
    });
    
    return result
}
// const getAllNewsIntoDB =async (payload:any,filteredData:any)=>{
//   console.log(payload)
//     let andConditions:Prisma.NewsWhereInput [] = [] ;
//     if (payload.searchTerm) {
//         andConditions.push({
//             OR:['title','content','createdAt'].map(feild =>({
//                 [feild]:{
//                     contains:payload.searchTerm,
//                     mode:"insensitive"
//                 }
//             }))
//         })
//     }
//      if (Object.keys(filteredData).length > 0) {
     
//           andConditions.push({
//             AND: Object.keys(filteredData).map((key) => ({
//               [key]: {
//                 gte: (filteredData as any)[key],
//                 lte: new Date((filteredData as any)[key]).getDate()+1,
//               },
//             })),
//           });
//         }
// const whereConditions:Prisma.NewsWhereInput = andConditions.length >0 ?{AND:andConditions}:{}
//     const result = await prisma.news.findMany({
//         where:whereConditions,
//          include: {
//     author: {
//       select: {
//         id: true,
//         name: true, // or whatever fields your User model has
//         email: true,
//       },
//     },
//     category: {
//       select: {
//         id: true,
//         name: true,
//       },
//     },
//     likes:true
//   },
//     });
//     return result
// }


const getAllNewsIntoDB = async (payload: any, filteredData: any) => {
  console.log(payload);

  let andConditions: Prisma.NewsWhereInput[] = [];

  // Handle search term for title, content, and createdAt
  if (payload.searchTerm) {
    andConditions.push({
      OR: ["title", "content", "createdAt"].map((field) => ({
        [field]: {
          contains: payload.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  // Handle filtered data
  if (Object.keys(filteredData).length > 0) {
    andConditions.push({
      AND: Object.keys(filteredData).map((key) => {
        if (key === "createdAt") {
          const date = new Date(filteredData[key]);
          console.log(date)
          const nextDate = new Date(date);
          nextDate.setDate(date.getDate() + 1);

          return {
            createdAt: {
              gte: date,
              lt: nextDate,
            },
          };
        }

        return {
          [key]: {
            equals: filteredData[key],
          },
        };
      }),
    });
  }

  const whereConditions: Prisma.NewsWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.news.findMany({
    where: whereConditions,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      likes: true,
    },
  });

  return result;
};

const getNewsByIdIntoDB =async (id:string)=>{
const result = await prisma.news.findFirstOrThrow({
    where:{
        id
    },
      include: {
    author: {
      select: {
        id: true,
        name: true, // or whatever fields your User model has
        email: true,
      },
    },
    category: {
      select: {
        id: true,
        name: true,
      },
    },
    likes:true,
    comments:true
  },
});
return result
}
export const newsService ={
    createNewsFromDB,
    getAllNewsIntoDB,
    getNewsByIdIntoDB
}