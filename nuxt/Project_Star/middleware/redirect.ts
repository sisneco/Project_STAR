import { userStore } from "../stores/userStore";

// ENUM
enum pagePath {
  login = "/login",
  initialize = "/initialize",
  home = "/home",
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  // USE IMPORT VALUES
  const nuxtApp = useNuxtApp();

  const result: any = await nuxtApp.$fetchAuthInfo;

  console.log(result);
  // No Login
  if (result === null) {
    if (redirectPageRejects(to, from, pagePath.login)) {
      return;
    }

    return navigateTo(pagePath.login);
  }

  if (!userStore().isSettingStoreValue) {
    await userStore().fetchUserInfo();
  }

  if (!userStore().isSettingStoreValue) {
    if (redirectPageRejects(to, from, pagePath.initialize)) {
      return;
    }
    return navigateTo(pagePath.initialize);
  }
});

const redirectPageRejects = (to: any, from: any, path: pagePath) => {
  if (to.path === path && from.path !== path) {
    return true;
  }

  if (to.path !== path && from.path === path) {
    return true;
  }

  if (to.path === path && from.path === path) {
    return true;
  }

  return false;
};
