import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";

export async function getFcmToken() {
  const permissio = await Notification.requestPermission();
  if (permissio == "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BHNXuM2EMjQIx8P-3TVzKrYNmlPq3iqvBU6W5MwwQGdkmM1eW6W3zhw5qqemRaDtXH7EJz2dL8kXyZhh7uUMO5o",
    });
    return token;
  }
}

const firebaseConfig = {
  apiKey: "AIzaSyBY-cy02eGUphORAPYztuu9d9akron71tI",
  authDomain: "hospital-1dad3.firebaseapp.com",
  projectId: "hospital-1dad3",
  storageBucket: "hospital-1dad3.appspot.com",
  messagingSenderId: "602731118828",
  appId: "1:602731118828:web:04dcfd5a8c31f1750e65c9",
  measurementId: "G-FSZKXREGVC",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseApp);

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });
