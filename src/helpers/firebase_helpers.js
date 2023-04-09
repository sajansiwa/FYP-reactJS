import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { firebaseApp, firebaseConfig } from "../App";
import { getAuth, signInAnonymously } from "firebase/auth";
import { initializeApp } from "firebase/app";

export async function getFcmToken() {
  const permissio = await Notification.requestPermission();
  if (permissio == "granted") {
    const messaging = getMessaging(firebaseConfig);
    const token = await getToken(messaging, {
      vapidKey:
        "BHNXuM2EMjQIx8P-3TVzKrYNmlPq3iqvBU6W5MwwQGdkmM1eW6W3zhw5qqemRaDtXH7EJz2dL8kXyZhh7uUMO5o",
    });
    return token;
  }
}
