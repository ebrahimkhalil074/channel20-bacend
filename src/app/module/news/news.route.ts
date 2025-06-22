import express from 'express';
import { newsController } from './news.controller';

import { UserRole } from '@prisma/client';
import auth from '../../../middleware/auth';
import { fileUploader } from '../../../helpers/fileUploder';
const router = express.Router()

router.post('/',fileUploader.upload.single("file"),auth(UserRole.ADMIN),newsController.createNews)
router.get('/',newsController.getAllNews)
router.get('/:id',newsController.getNews)

export  const newsRoutes =router 