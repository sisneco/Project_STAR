import { userStore } from "../stores/userStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  // USE IMPORT VALUES
  const nuxtApp = useNuxtApp();
  const auth: any = nuxtApp.$auth;

  // Observerのため、仕方なくPromiseでゴリ押す
  const initializeAuth = new Promise((resolve) => {
    auth.onAuthStateChanged((user: any) => {
      resolve(user);
    });
  });

  if (userStore().isSettingStoreValue()) {
  }

  const result: any = await initializeAuth;

  console.log(result.uid);

  if (result === null) {
    return navigateTo("/login");
  }

  userStore().setUid(result.uid);
});
