import express from 'express';
import { userController } from './users.controller';
const router = express.Router()
router.post('/',userController.createUser)




export  const userRoutes =router