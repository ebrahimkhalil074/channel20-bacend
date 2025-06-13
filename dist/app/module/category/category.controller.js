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
exports.categoryController = void 0;
const catchAsync_1 = __importDefault(require("../../../shered/catchAsync"));
const sendRes_1 = __importDefault(require("../../../shered/sendRes"));
const category_service_1 = require("./category.service");
const createCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.categoryService.createCategoryFromDB(req.body);
    (0, sendRes_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'category created sucessfully',
        data: result
    });
}));
const getAllCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const filteredData = query;
    console.log({ filteredData });
    const result = yield category_service_1.categoryService.getAllCategoryFromDB(req.query, filteredData);
    (0, sendRes_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'all category rectrive sucessfully',
        data: result
    });
}));
exports.categoryController = {
    createCategory,
    getAllCategory
};
