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
const generateToken_1 = require("../helpers/generateToken");
const config_env_1 = __importDefault(require("../config.env"));
const config_1 = __importDefault(require("../config"));
const http_status_codes_1 = require("http-status-codes");
const apiError_1 = __importDefault(require("../errors/apiError"));
const auth = (...roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            console.log({ token });
            if (!token) {
                throw new apiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'you are not authorized');
            }
            console.log();
            const verifiedUser = generateToken_1.jwtHelpers.verifyToken(token, config_env_1.default.jwt_access_secret);
            console.log({ verifiedUser });
            console.log(roles);
            const user = yield config_1.default.user.findUniqueOrThrow({
                where: {
                    email: verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.email,
                },
            });
            req.user = user;
            if (!roles.includes(user.role)) {
                throw new apiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'forbidden access ');
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
};
exports.default = auth;
