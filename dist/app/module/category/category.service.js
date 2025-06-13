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
exports.categoryService = void 0;
const config_1 = __importDefault(require("../../../config"));
const createCategoryFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield config_1.default.category.create({
        data: payload
    });
    return result;
});
const getAllCategoryFromDB = (payload, filteredData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('12', { payload });
    console.log(filteredData);
    let andConditions = [];
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
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    console.log(whereConditions);
    const result = yield config_1.default.category.findMany({
        where: whereConditions,
        include: {
            news: true,
        }
    });
    return result;
});
exports.categoryService = {
    createCategoryFromDB,
    getAllCategoryFromDB
};
