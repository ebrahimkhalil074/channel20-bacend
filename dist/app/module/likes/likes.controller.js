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
exports.likeController = exports.createLikes = void 0;
const catchAsync_1 = __importDefault(require("../../../shered/catchAsync"));
const sendRes_1 = __importDefault(require("../../../shered/sendRes"));
const http_status_codes_1 = require("http-status-codes");
;
const likes_service_1 = require("./likes.service");
const generateToken_1 = require("../../../helpers/generateToken");
const config_env_1 = __importDefault(require("../../../config.env"));
// const createLikes =catchAsync(async(req:Request&{user?:any},res:Response)=>{
//   const token =req.headers.authorization;
//   if (!token) {
//     throw new Error("token nai")
//   }
//        const verifiedUser =jwtHelpers.verifyToken(token,configEnv.jwt_access_secret as string)
//     const {id} =req.params
//      const anonymousId =  req.body.anonymousId;
// console.log(id,anonymousId,verifiedUser)
//     const result = await likeService.createLikesFromDB(id,anonymousId,verifiedUser)
//     sendResponse(res,{
//       success:true,
//       statusCode: StatusCodes.OK,
//        message: 'Likes created successfully',
//        data: result
//     })
// })
exports.createLikes = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('CLICK');
    let verifiedUser = {};
    // ✅ Step 3: Get ID from req.params (it could be either newsId or videoId)
    const { id } = req.params;
    // ✅ Step 4: Get type (to identify whether it's news or video)
    const { type, anonymousId } = req.body;
    if (anonymousId === null || undefined) {
        // ✅ Step 1: Get token from headers
        const token = req.headers.authorization;
        // ✅ Step 2: Verify the JWT token to get logged-in user (if any)
        verifiedUser = generateToken_1.jwtHelpers.verifyToken(token, config_env_1.default.jwt_access_secret);
    }
    console.log('CLICK');
    if (!anonymousId) {
        throw new Error('Anonymous ID is missing');
    }
    if (!type || (type !== 'news' && type !== 'video')) {
        throw new Error("Invalid type. Must be either 'news' or 'video'");
    }
    // ✅ Step 5: Prepare proper argument for DB logic
    const newsId = type === 'news' ? id : undefined;
    const videoId = type === 'video' ? id : undefined;
    // ✅ Step 6: Call service function
    const result = yield likes_service_1.likeService.createLikesFromDB(newsId, videoId, anonymousId, verifiedUser);
    // ✅ Step 7: Send response
    (0, sendRes_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: result.status === 'liked'
            ? 'Liked successfully'
            : 'Unliked successfully',
        data: result,
    });
}));
const getAllLikes = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield likes_service_1.likeService.getAllLikesIntoDB(query);
    (0, sendRes_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'all Likes rectrive sucessfully',
        data: result
    });
}));
const getLikes = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield likes_service_1.likeService.getLikesByIdIntoDB(id);
    (0, sendRes_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'all Likes rectrive sucessfully',
        data: result
    });
}));
exports.likeController = {
    createLikes: exports.createLikes,
    getAllLikes,
    getLikes
};
