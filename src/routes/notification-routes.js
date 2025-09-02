import express from "express";
import ensureAuthenticated from "../middlewares/validate-token-middleware.js";
import {
  createNotification,
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead
} from "../controllers/notification-controllers.js";

const router = express.Router();

// Create notification
router.post('/', ensureAuthenticated, createNotification);

// Get all notifications for a user
router.get('/:authId', ensureAuthenticated, getNotifications);

// Mark single notification as read
router.patch('/:notificationId/read', ensureAuthenticated, markNotificationAsRead);

// Mark all notifications as read
router.patch('/:authId/read-all', ensureAuthenticated, markAllNotificationsAsRead);

export default router;
