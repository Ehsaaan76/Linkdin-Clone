import express from 'express';
import { Login, Logout, Signup, getCurrentUser } from '../controllers/auth.controller.js';
import { protectRoute } from '../Middleware/auth.middleware.js';

const router = express.Router()

router.post("/signup", Signup)
router.post("/login", Login);
router.post("/logout", Logout)

router.get("/me", protectRoute, getCurrentUser)

export default router