import Notification from '../models/notifications-model.js';
import mongoose from 'mongoose';

// 1. Create a new notification
export const createNotificationService = async ({ authId, title, body, path, notificationType, data }) => {
  const newNotification = new Notification({
    authId: new mongoose.Types.ObjectId(authId),
    title,
    body,
    path,
    notificationType,
    data,
  });

  await newNotification.save();
  return newNotification;
};

// 2. Get notifications for a user
export const getNotificationsService = async ({ authId }) => {
  const notifications = await Notification.find({ authId: new mongoose.Types.ObjectId(authId) })
    .sort({ createdAt: -1 });

  return notifications;
};

// 3. Mark single notification as read
export const markNotificationAsReadService = async ({ notificationId }) => {
  const notification = await Notification.findByIdAndUpdate(
    new mongoose.Types.ObjectId(notificationId),
    { is_read: true },
    { new: true }
  );

  if (!notification) {
    throw { status: 404, message: 'Notification not found' };
  }

  return notification;
};

// 4. Mark all notifications as read for a user
export const markAllNotificationsAsReadService = async ({ authId }) => {
  const notifications = await Notification.updateMany(
    { authId: new mongoose.Types.ObjectId(authId), is_read: false },
    { $set: { is_read: true } }
  );

  return notifications;
};
