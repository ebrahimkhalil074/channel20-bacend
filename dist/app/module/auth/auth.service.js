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
exports.authServices = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const emailSender_1 = __importDefault(require("./emailSender"));
const config_1 = __importDefault(require("../../../config"));
const generateToken_1 = require("../../../helpers/generateToken");
const config_env_1 = __importDefault(require("../../../config.env"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const userData = yield config_1.default.user.findFirstOrThrow({
        where: {
            email: payload.email,
        }
    });
    const isPasswordMatchd = bcryptjs_1.default.compareSync(payload.password, userData.password); // true
    console.log(isPasswordMatchd);
    if (!isPasswordMatchd) {
        throw new Error("Invalid credentials");
    }
    const jwtPayload = {
        role: userData.role,
        email: userData.email
    };
    const accessToken = generateToken_1.jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role,
    }, process.env.jwt_access_secret, process.env.jwt_access_expires_in);
    const refreshToken = generateToken_1.jwtHelpers.generateToken(jwtPayload, process.env.jwt_refresh_secret, process.env.jwt_access_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(token);
    const decodetToken = generateToken_1.jwtHelpers.verifyToken(token, process.env.jwt_refresh_secret);
    const user = yield config_1.default.user.findFirstOrThrow({
        where: {
            email: decodetToken.email
        }
    });
    const accessToken = generateToken_1.jwtHelpers.generateToken({ email: user.email,
        role: user.role
    }, process.env.jwt_access_secret, process.env.jwt_access_expires_in);
    console.log('ref', { accessToken });
    return {
        accessToken,
    };
});
const changePassword = (user, payload) => {
    // match password
    const isPasswordMatchd = bcryptjs_1.default.compareSync(payload.oldPassword, user.password); // true
    console.log("match password", isPasswordMatchd);
    if (!isPasswordMatchd) {
        throw new Error("Invalid credentials");
    }
    // hash the password
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hashPassword = bcryptjs_1.default.hashSync(payload.newPassword, salt);
    console.log(hashPassword);
    // update the password
    return config_1.default.user.update({
        where: {
            email: user.email
        },
        data: {
            password: hashPassword,
        }
    });
};
const forgatedPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield config_1.default.user.findUniqueOrThrow({
        where: {
            email: payload.email,
        },
    });
    const resetPasswordToken = generateToken_1.jwtHelpers.generateToken(user, config_env_1.default.jwt_reset_secret, process.env.jwt_access_expires_in);
    console.log(resetPasswordToken);
    //http://localhost:3000/reset-pass?id=user.id&token=token  
    const resetPasswordLink = `${config_env_1.default.reset_pass_ui_link}id=${user.id}&token=${resetPasswordToken}`;
    console.log(resetPasswordLink);
    (0, emailSender_1.default)(user.email, `
    <div>
    <h2>Helo Dear</h2>
    <p>Your Reset Password Link
    <a href=${resetPasswordLink}>
    <button>Reset Password</button>
    </a>
    </p>

    </div>
    `);
});
const resetPassword = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(token, payload);
    const user = yield config_1.default.user.findFirstOrThrow({
        where: {
            id: payload.id,
        }
    });
    // validate token
    const decodetToken = generateToken_1.jwtHelpers.verifyToken(token, config_env_1.default.jwt_reset_secret);
    console.log("decoded token", decodetToken);
    if (!decodetToken) {
        throw new Error("Invalid token");
    }
    // hash the password
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hashPassword = bcryptjs_1.default.hashSync(payload.password, salt);
    console.log(hashPassword);
    // update the password
    return config_1.default.user.update({
        where: {
            id: user.id
        },
        data: {
            password: hashPassword
        }
    });
});
exports.authServices = {
    loginUser,
    refreshToken,
    changePassword,
    forgatedPassword,
    resetPassword
};
