"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsService = void 0;
const config_1 = __importDefault(require("../../../config"));
const createNewsFromDB = (payload, image, user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(image);
    const result = yield config_1.default.news.create({
        data: Object.assign(Object.assign({}, payload), { authorId: user === null || user === void 0 ? void 0 : user.id, image: image.secure_url })
    });
    return result;
});
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
const getAllNewsIntoDB = (payload, filteredData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    let andConditions = [];
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
                    console.log(date);
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
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield config_1.default.news.findMany({
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
});
const getNewsByIdIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield config_1.default.news.findFirstOrThrow({
        where: {
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
            likes: true,
            comments: true
        },
    });
    return result;
});
exports.newsService = {
    createNewsFromDB,
    getAllNewsIntoDB,
    getNewsByIdIntoDB
};
