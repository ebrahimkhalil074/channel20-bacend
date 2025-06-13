"use strict";
// import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'
// const generateToken = (
//     payload: any,
//     secret: string,
//     expiresIn: any
//   ) => {
//     const time:SignOptions ={ expiresIn }
//     const token = jwt.sign(payload, secret, time);
//     return token;
//   };
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtHelpers = exports.verifyToken = exports.generateToken = void 0;
// const verifyToken =(payload:any , secret:string)=>{
//     let token;
//     console.log('vft',payload,secret)
//     console.log('vft',token)
//     try {
//         token =jwt.verify(payload,secret, ) as JwtPayload;
//     } catch (error) {
//         throw new Error('you are not authorized!')
//     }
//     console.log(token)
//     return token;
// }
// export const jwtHelpers ={
//     generateToken,
//     verifyToken
// } 
const apiError_1 = __importDefault(require("../errors/apiError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload, secret, expiresIn) => {
    const options = {
        expiresIn: expiresIn,
    };
    return jsonwebtoken_1.default.sign(payload, secret, options);
};
exports.generateToken = generateToken;
const verifyToken = (token, secret) => {
    try {
        return jsonwebtoken_1.default.verify(token, secret);
    }
    catch (error) {
        throw new apiError_1.default(401, ' token You are not authorized!');
    }
};
exports.verifyToken = verifyToken;
exports.jwtHelpers = {
    generateToken: exports.generateToken,
    verifyToken: exports.verifyToken
};
