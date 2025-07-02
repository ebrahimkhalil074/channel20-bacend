"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const comments_controller_1 = require("./comments.controller");
const router = express_1.default.Router();
router.post('/:id', comments_controller_1.commentController.createComment);
router.patch('/:id', comments_controller_1.commentController.updatedComment);
exports.commentRoutes = router;
