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
exports.authControllers = void 0;
const http_status_codes_1 = require("http-status-codes");
const auth_service_1 = require("./auth.service");
const catchAsync_1 = __importDefault(require("../../../shered/catchAsync"));
const sendRes_1 = __importDefault(require("../../../shered/sendRes"));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authServices.loginUser(req.body);
    const { refreshToken } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: false,
        httpOnly: true,
    });
    (0, sendRes_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'login successfull',
        data: {
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
        }
    });
}));
const refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield auth_service_1.authServices.refreshToken(refreshToken);
    (0, sendRes_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'access token get  successfull',
        data: {
            accessToken: result.accessToken,
        }
    });
}));
const changePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authServices.changePassword(req.user, req.body);
    (0, sendRes_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'password changed successfully',
        data: result
    });
}));
const forgatedPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const result = yield auth_service_1.authServices.forgatedPassword(req.body);
    (0, sendRes_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'forgated password  successfully',
        data: result
    });
}));
const resetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization || '';
    console.log(req.body);
    const result = yield auth_service_1.authServices.resetPassword(token, req.body);
    (0, sendRes_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'reset password  successfully',
        data: result
    });
}));
exports.authControllers = {
    loginUser,
    refreshToken,
    changePassword,
    forgatedPassword,
    resetPassword
};
