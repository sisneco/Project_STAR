import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

export default defineNuxtPlugin((nuxtApp) => {
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

  const auth = firebase.auth();

  // Observerのため、仕方なくPromiseでゴリ押す
  const initializeAuth = new Promise((resolve) => {
    auth.onAuthStateChanged((user: any) => {
      resolve(user);
    });
  });

  nuxtApp.provide("auth", auth);

  nuxtApp.provide("fetchAuthInfo", initializeAuth);

  nuxtApp.provide("db", firebase.firestore());

  nuxtApp.provide("storage", firebase.storage());

  nuxtApp.provide("firebase", firebase);
});
