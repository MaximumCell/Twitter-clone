import express from 'express';
import { getMe, login, logout, signup } from '../controllers/auth.controller.js';
import { protectRoute } from '../midelware/protectRoute.js';

const router = express.Router();

router.get('/me',protectRoute , getMe)

router.post('/signup', signup);


router.post('/login', login);


router.get('/logout', logout);


export default router; // Export the router instance