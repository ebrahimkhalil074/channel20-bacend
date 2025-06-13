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
exports.newsController = void 0;
const catchAsync_1 = __importDefault(require("../../../shered/catchAsync"));
const news_services_1 = require("./news.services");
const sendRes_1 = __importDefault(require("../../../shered/sendRes"));
const http_status_codes_1 = require("http-status-codes");
const fileUploder_1 = require("../../../helpers/fileUploder");
const pick_1 = __importDefault(require("../../../shered/pick"));
const createNews = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = JSON.parse(req.body.data);
    console.log(data);
    const user = req.user;
    console.log(user);
    const file = req.file;
    console.log({ file });
    const image = yield fileUploder_1.fileUploder.uploadToCloudinary(file);
    console.log(image);
    const result = yield news_services_1.newsService.createNewsFromDB(data, image, user);
    (0, sendRes_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'news created successfully',
        data: result
    });
}));
const getAllNews = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('hi');
    const query = req.query;
    const filteredData = (0, pick_1.default)(query, ['category', 'searchTerm', 'createdAt']);
    const result = yield news_services_1.newsService.getAllNewsIntoDB(query, filteredData);
    (0, sendRes_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'all news rectrive sucessfully',
        data: result
    });
}));
const getNews = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield news_services_1.newsService.getNewsByIdIntoDB(id);
    (0, sendRes_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'all news rectrive sucessfully',
        data: result
    });
}));
exports.newsController = {
    createNews,
    getAllNews,
    getNews
};
