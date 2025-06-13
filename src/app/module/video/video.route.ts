import express from 'express';
import { videoController } from './video.controller';
const router = express.Router()


router.post('/',videoController.createVideo)
router.get('/',videoController.getAllVideos)
router.get('/:id',videoController.getVideo) 

export  const videoRoutes =router