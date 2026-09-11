import admin from "firebase-admin";
import { getApps, getApp } from "firebase-admin/app";

const serviceAccount = JSON.parse(process.env.FCM_SERVER_KEY);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Check if an app already exists
const app = getApps().length === 0
  ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
  : getApp();

export const pushNotification = async ({ deviceToken, topic, condition, title, body }) => {
  try {
    const hasToken = deviceToken && typeof deviceToken === 'string' && deviceToken.trim() !== '' && deviceToken !== 'null' && deviceToken !== 'undefined';
    const hasTopic = topic && typeof topic === 'string' && topic.trim() !== '';
    const hasCondition = condition && typeof condition === 'string' && condition.trim() !== '';

    const targetCount = [hasToken, hasTopic, hasCondition].filter(Boolean).length;

    if (targetCount !== 1) {
      console.warn("Push Notification Skipped: Exactly one of topic, token or condition is required.");
      return;
    }

    const message = {
      notification: { title, body },
    };

    if (hasToken) message.token = deviceToken;
    else if (hasTopic) message.topic = topic;
    else if (hasCondition) message.condition = condition;

    return await admin.messaging().send(message);
  } catch (err) {
    console.error("Push Notification Error:", err);
    // Notification failures must NEVER cause login failure. Return null instead of throwing.
    return null;
  }
};
