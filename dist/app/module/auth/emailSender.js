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
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_env_1 = __importDefault(require("../../../config.env"));
const emailSender = (email, html) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(config_env_1.default.emailSender.email, config_env_1.default.emailSender.app_password);
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
            user: config_env_1.default.emailSender.email,
            pass: config_env_1.default.emailSender.app_password,
        },
    });
    // async..await is not allowed in global scope, must use a wrapper
    // send mail with defined transport object
    const info = yield transporter.sendMail({
        from: '"Channel Twenty 👻" <mdebrahimkhalil074@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Reset Password Link", // Subject line
        //   text: "Hello world?", // plain text body
        html // html body
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
});
exports.default = emailSender;
