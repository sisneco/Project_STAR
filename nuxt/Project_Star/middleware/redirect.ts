export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp();

  const auth: any = nuxtApp.$auth;

  // Observerのため、仕方なくPromiseでゴリ押す
  const initializeAuth = new Promise((resolve) => {
    auth.onAuthStateChanged((user: any) => {
      resolve(user);
    });
  });

  let isLogin = false;

  const result = await initializeAuth;

  console.log(result.uid);

  if (result === null) {
    return navigateTo("/login");
  }
});
