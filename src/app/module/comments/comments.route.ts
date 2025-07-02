import express from 'express';
import { commentController } from './comments.controller';

const router = express.Router()
router.post('/:id',commentController.createComment)
router.patch('/:id',commentController.updatedComment)

export const commentRoutes =router