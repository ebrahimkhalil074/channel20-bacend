"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../app/module/auth/auth.route");
const users_route_1 = require("../app/module/users/users.route");
const news_route_1 = require("../app/module/news/news.route");
const video_route_1 = require("../app/module/video/video.route");
const category_route_1 = require("../app/module/category/category.route");
const likes_route_1 = require("../app/module/likes/likes.route");
const comments_route_1 = require("../app/module/comments/comments.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.authRoutes,
    },
    {
        path: "/user",
        route: users_route_1.userRoutes,
    },
    {
        path: "/news",
        route: news_route_1.newsRoutes,
    },
    {
        path: "/category",
        route: category_route_1.categoryRoutes,
    },
    {
        path: "/video",
        route: video_route_1.videoRoutes,
    },
    {
        path: "/like",
        route: likes_route_1.likeRoutes,
    },
    {
        path: "/comment",
        route: comments_route_1.commentRoutes,
    },
];
moduleRoutes.forEach(moduleRoute => {
    router.use(moduleRoute.path, moduleRoute.route);
});
exports.default = router;
