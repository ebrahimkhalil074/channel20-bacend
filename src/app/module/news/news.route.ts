import express from 'express';
import { newsController } from './news.controller';
import { fileUploder } from '../../../helpers/fileUploder';
import { UserRole } from '@prisma/client';
import auth from '../../../middleware/auth';
const router = express.Router()

router.post('/',fileUploder.upload.single("file"),auth(UserRole.ADMIN),newsController.createNews)
router.get('/',newsController.getAllNews)
router.get('/:id',newsController.getNews)

export  const newsRoutes =router 