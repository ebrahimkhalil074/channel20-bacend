import { Prisma } from "@prisma/client";
import prisma from "../../../config"

const createCategoryFromDB = async (payload:any)=>{
    const result =await prisma.category.create({
        data:payload
    });
    return result
}

const getAllCategoryFromDB =async(payload:any,filteredData:any)=>{
    console.log('12',{payload});
    console.log(filteredData)
    
      let andConditions: Prisma.CategoryWhereInput[] = [];
    
      // Handle search term for title, content, and createdAt
      if (payload.searchTerm) {
        andConditions.push({
          OR: ['category'].map((field) => ({
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
            return {
              [key]: {
                equals: filteredData[key],
              },
            };
          }),
        });
      }
    
      const whereConditions: Prisma.CategoryWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};
        console.log(whereConditions)
    const result =await prisma.category.findMany({
        where:whereConditions,
        include:{
            news:true,
            
        }
    })

    return result
}
export const categoryService ={

    createCategoryFromDB,
    getAllCategoryFromDB
}