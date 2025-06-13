"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const news_controller_1 = require("./news.controller");
const fileUploder_1 = require("../../../helpers/fileUploder");
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../../middleware/auth"));
const router = express_1.default.Router();
router.post('/', fileUploder_1.fileUploder.upload.single("file"), (0, auth_1.default)(client_1.UserRole.ADMIN), news_controller_1.newsController.createNews);
router.get('/', news_controller_1.newsController.getAllNews);
router.get('/:id', news_controller_1.newsController.getNews);
exports.newsRoutes = router;
