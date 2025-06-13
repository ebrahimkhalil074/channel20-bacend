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
const createVideoFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield config_1.default.video.create({
        data: payload
    });
    return result;
});
const getAllVideosIntoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield config_1.default.video.findMany({
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
