import admin from "firebase-admin";
import {getApps, getApp} from "firebase-admin/app";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccount = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../../config/firebase-service-account.json"),
    "utf8"
  )
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Check if an app already exists
const app = getApps().length === 0
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : getApp();

export const pushNotification = async ({ deviceToken, title, body }) => {
  try {
    const message = {
      token: deviceToken,
      notification: { title, body },
    };
    return await admin.messaging().send(message);
  } catch (err) {
    console.error("Push Notification Error:", err);
    throw err;
  }
};

