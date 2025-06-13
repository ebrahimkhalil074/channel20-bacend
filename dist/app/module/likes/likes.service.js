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
exports.likeService = void 0;
const config_1 = __importDefault(require("../../../config"));
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
const createLikesFromDB = (newsId, videoId, anonymousId, verifiedUser) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = null;
    // ✅ 1. যদি verified user থাকে (login করা), তাহলে userId বের করি
    if (verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.email) {
        const user = yield config_1.default.user.findUnique({
            where: { email: verifiedUser.email },
        });
        userId = user === null || user === void 0 ? void 0 : user.id;
    }
    // ✅ 2. newsId বা videoId যেকোনো একটা আসা বাধ্যতামূলক
    if (!newsId && !videoId) {
        throw new Error("Either newsId or videoId is required.");
    }
    // ✅ 3. news/video আসলেই আছে কিনা, তা যাচাই
    if (newsId) {
        const newsExists = yield config_1.default.news.findUnique({
            where: { id: newsId },
        });
        if (!newsExists) {
            throw new Error("Invalid newsId: News does not exist.");
        }
    }
    if (videoId) {
        const videoExists = yield config_1.default.video.findUnique({
            where: { id: videoId },
        });
        if (!videoExists) {
            throw new Error("Invalid videoId: Video does not exist.");
        }
    }
    // ✅ 4. আগেই like করা হয়েছে কিনা তা যাচাই
    const likeCheckWhere = Object.assign(Object.assign(Object.assign({}, (userId ? { userId } : { anonymousId })), (newsId ? { newsId } : {})), (videoId ? { videoId } : {}));
    const existingLike = yield config_1.default.like.findFirst({
        where: likeCheckWhere,
    });
    // ✅ 5. যদি like আগে থেকেই থাকে → unlike করে দেই
    if (existingLike) {
        yield config_1.default.like.delete({
            where: { id: existingLike.id },
        });
        return { status: 'unliked', data: existingLike };
    }
    // ✅ 6. নতুন like তৈরি করি
    const newLike = yield config_1.default.like.create({
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
    console.log(newLike);
    return { status: 'liked', data: newLike };
});
const getAllLikesIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield config_1.default.like.findMany({});
    return result;
});
const getLikesByIdIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield config_1.default.like.findFirstOrThrow({
        where: {
            id
        },
    });
    return result;
});
exports.likeService = {
    createLikesFromDB,
    getAllLikesIntoDB,
    getLikesByIdIntoDB
};
