"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const likes_controller_1 = require("./likes.controller");
const router = express_1.default.Router();
router.post('/:id', likes_controller_1.likeController.createLikes);
exports.likeRoutes = router;
