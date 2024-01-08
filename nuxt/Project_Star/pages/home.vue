<script setup lang="ts">
import HomeWishContainer from "../components/HomeWishContainer.vue";

definePageMeta({
  middleware: ["redirect"],
});

// LifeCicle
</script>

<template>
  <div
    class="flex p-8 md:p-12 lg:p-10 lg:justify-center bg-img flex-col gap-x-10 lg:flex-row items-center lg:items-start bg-slate-50 min-h-screen over-1980"
  >
    <div
      class="hidden lg:flex items-end w-1/6 [writing-mode:vertical-rl] text-[10em] font-bold text-gray-300 font-oswald"
    >
      <h2>Wha't star</h2>
    </div>
    <div
      class="w-full lg:w-3/6 flex flex-col items-center border border-gray-200"
    >
      <HomeInputForm />
      <HomeWishContainer />
    </div>
    <div class="hidden lg:flex flex-col w-2/6 gap-y-6 sticky">
      <HomeMyInfomation />
      <HomePartnerInfomation />
    </div>
  </div>
</template>

<style scoped>
.over-1980 {
  @media (min-width: 1980px) {
    padding-left: 12rem;
    padding-right: 12rem;
  }
}
</style>
