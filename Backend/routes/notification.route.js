import express from 'express';
import { protectRoute } from '../Middleware/auth.middleware.js';
import { deleteNotification, getUserNotifications, markNotificationAsRead } from '../controllers/notification.controller.js';

const router = express.Router();

router.post('/', protectRoute, getUserNotifications)
router.put('/:id/read', protectRoute, markNotificationAsRead)
router.delete('/:id', protectRoute, deleteNotification)

export default router