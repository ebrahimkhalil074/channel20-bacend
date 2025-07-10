import express from 'express';
import { videoController } from './video.controller';
import { UserRole } from '@prisma/client';
import auth from '../../../middleware/auth';
const router = express.Router()


router.post('/',auth(UserRole.ADMIN),videoController.createVideo)
router.get('/',videoController.getAllVideos)
router.get('/:id',videoController.getVideo) 

export  const videoRoutes =router