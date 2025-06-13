
import express from 'express';
import { authControllers } from './auth.controller';


const router =  express.Router();
router.post('/login',authControllers.loginUser);
router.post('/refresh-token',authControllers.refreshToken);
router.post('/change-password',authControllers.changePassword);
router.post('/forgated-password',authControllers.forgatedPassword);
router.post('/reset-password',authControllers.resetPassword);
 


export const authRoutes = router