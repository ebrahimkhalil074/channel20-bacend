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
exports.videoService = void 0;
const config_1 = __importDefault(require("../../../config"));
const createVideoFromDB = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield config_1.default.video.create({
        data: Object.assign(Object.assign({}, payload), { authorId: user === null || user === void 0 ? void 0 : user.id })
    });
    return result;
});
const getAllVideosIntoDB = (payload, filteredData) => __awaiter(void 0, void 0, void 0, function* () {
    let andConditions = [];
    if (payload.searchTerm) {
        andConditions.push({
            OR: ['category', 'title'].map(field => ({
                [field]: {
                    contains: payload.searchTerm,
                    mode: "insensitive",
                }
            }))
        });
    }
    if (Object.keys(filteredData).length < 0) {
        andConditions.push({
            AND: Object.keys(filteredData).map(key => ({
                [key]: filteredData[key]
            }))
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield config_1.default.video.findMany({
        where: whereConditions,
        include: {
            category: true,
            comments: true,
            likes: true
        }
    });
    return result;
});
const getVideoIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield config_1.default.video.findFirstOrThrow({
        where: {
            id
        },
        include: {
            category: true,
            comments: true,
            likes: true
        }
    });
    return result;
});
exports.videoService = {
    createVideoFromDB,
    getAllVideosIntoDB,
    getVideoIntoDB
};
