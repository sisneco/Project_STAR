import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default defineNuxtPlugin(() => {
  const firebaseConfig = {
    apiKey: "AIzaSyCIAUVKQr-dgJheuaQdQyRbnS4at9JPm-c",
    authDomain: "wh-star.firebaseapp.com",
    projectId: "wh-star",
    storageBucket: "wh-star.appspot.com",
    messagingSenderId: "488492857808",
    appId: "1:488492857808:web:7e909ab80d876a01d1e1d5",
    measurementId: "G-40RLNW8VV1",
  };

  firebase.initializeApp(firebaseConfig);
});
