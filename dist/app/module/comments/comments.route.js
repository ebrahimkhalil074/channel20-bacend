"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const comments_controller_1 = require("./comments.controller");
const auth_1 = __importDefault(require("../../../middleware/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post('/:id', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), comments_controller_1.commentController.createComment);
exports.commentRoutes = router;
