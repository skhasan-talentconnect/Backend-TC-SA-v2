import express from "express";
import ensureAuthenticated from "../middlewares/validate-token-middleware.js";
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead
} from "../controllers/notification-controllers.js";

const router = express.Router();

// Get all notifications for a user
router.get('/:authId', ensureAuthenticated, getNotifications);

// Mark single notification as read
router.patch('/:notificationId/read', ensureAuthenticated, markNotificationAsRead);

// Mark all notifications as read
router.patch('/:authId/read-all', ensureAuthenticated, markAllNotificationsAsRead);

export default router;
