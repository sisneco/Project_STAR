<script setup lang="ts">
// USE IMPORT VALUES
const nuxtApp = useNuxtApp();
const auth = nuxtApp.$auth;

// METHODS
function logOut(): void {
  nuxtApp.$auth.signOut().then(() => {
    userStore().initialStore();

    return navigateTo("/login");
  });
}
</script>

<template>
  <button
    class="w-32 p-2 rounded-full text-blue-500 font-bold font-sans border border-blue-500 ml-auto hidden lg:block md:fixed bottom-4 left-4 md:w-64 md:text-2xl"
    @click="logOut()"
    v-if="userStore().isSettingStoreValue"
  >
    ログアウト
  </button>
  <header
    class="sticky top-0 h-24 bg-neutral-800 font-notojp flex items-center p-4 gap-x-4 lg:hidden z-40"
  >
    <h1 class="text-white text-5xl font-oswald">Wh'Star</h1>

    <button
      class="w-32 p-2 rounded-full text-blue-500 font-bold font-sans border border-blue-500 ml-auto"
      @click="logOut()"
      v-if="userStore().isSettingStoreValue"
    >
      ログアウト
    </button>
  </header>
</template>
