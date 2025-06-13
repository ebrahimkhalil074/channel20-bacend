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
exports.commentController = exports.createComment = void 0;
const catchAsync_1 = __importDefault(require("../../../shered/catchAsync"));
const sendRes_1 = __importDefault(require("../../../shered/sendRes"));
const http_status_codes_1 = require("http-status-codes");
;
const generateToken_1 = require("../../../helpers/generateToken");
const config_env_1 = __importDefault(require("../../../config.env"));
const comment_service_1 = require("./comment.service");
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
exports.createComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('CLICK');
    // ✅ Step 3: Get ID from req.params (it could be either newsId or videoId)
    const { id } = req.params;
    // ✅ Step 4: Get type (to identify whether it's news or video)
    const { type, anonymousId, content } = req.body;
    let verifiedUser = {};
    if (!anonymousId) {
        const token = req.headers.authorization;
        if (token) {
            verifiedUser = generateToken_1.jwtHelpers.verifyToken(token, config_env_1.default.jwt_access_secret);
        }
    }
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
    const result = yield comment_service_1.commentService.createCommentFromDB(newsId, videoId, anonymousId, content, verifiedUser);
    // ✅ Step 7: Send response
    (0, sendRes_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'comment created successfully',
        data: result,
    });
}));
const getAllComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield comment_service_1.commentService.getAllCommentIntoDB(query);
    (0, sendRes_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'all Likes rectrive sucessfully',
        data: result
    });
}));
const getComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield comment_service_1.commentService.getCommentByIdIntoDB(id);
    (0, sendRes_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'all Likes rectrive sucessfully',
        data: result
    });
}));
exports.commentController = {
    createComment: exports.createComment,
    getAllComment,
    getComment
};
