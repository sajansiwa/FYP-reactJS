importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);
const firebaseConfig = {
  apiKey: "AIzaSyBY-cy02eGUphORAPYztuu9d9akron71tI",
  authDomain: "hospital-1dad3.firebaseapp.com",
  projectId: "hospital-1dad3",
  storageBucket: "hospital-1dad3.appspot.com",
  messagingSenderId: "602731118828",
  appId: "1:602731118828:web:04dcfd5a8c31f1750e65c9",
  measurementId: "G-FSZKXREGVC",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
