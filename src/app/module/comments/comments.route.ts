import express from 'express';
import { commentController } from './comments.controller';
import auth from '../../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = express.Router()
router.post('/:id',auth(UserRole.ADMIN,UserRole.USER) ,commentController.createComment)

export const commentRoutes =router