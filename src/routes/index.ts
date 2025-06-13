import express from 'express';
import { authRoutes } from '../app/module/auth/auth.route';
import { userRoutes } from '../app/module/users/users.route';
import { newsRoutes } from '../app/module/news/news.route';
import { videoRoutes } from '../app/module/video/video.route';
import { categoryRoutes } from '../app/module/category/category.route';
import { likeRoutes } from '../app/module/likes/likes.route';
import { commentRoutes } from '../app/module/comments/comments.route';
const router = express.Router();
const moduleRoutes =[
    {
path:"/auth",
route:authRoutes,
    },
    {
path:"/user",
route:userRoutes,
    },
    {
path:"/news",
route:newsRoutes,
    },
    {
path:"/category",
route:categoryRoutes,
    },
    {
path:"/video",
route:videoRoutes,
    },
    {
path:"/like",
route:likeRoutes,
    },
    {
path:"/comment",
route:commentRoutes,
    },
]

 moduleRoutes.forEach(moduleRoute=>{
router.use(moduleRoute.path,moduleRoute.route)
 } );

 export default router;