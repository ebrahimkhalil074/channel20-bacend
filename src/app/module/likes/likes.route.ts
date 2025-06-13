import express from 'express';
import { likeController } from './likes.controller';
import auth from '../../../middleware/auth';
import { UserRole } from '@prisma/client';
const router = express.Router()
router.post('/:id', likeController.createLikes)

export const likeRoutes =router