<script setup lang="ts">
// VALUES
const isVisibleLoadingWindow: Ref<boolean> = ref(false);

// METHODS
function switchIsVisibleLoadingWindow(): void {
  isVisibleLoadingWindow.value = !isVisibleLoadingWindow.value;
}

defineExpose({
  isVisibleLoadingWindow,
  switchIsVisibleLoadingWindow,
});
</script>

<template>
  <div
    class="fixed top-0 left-0 bg-gray-100 z-50 w-full h-full opacity-50"
    v-if="isVisibleLoadingWindow"
  >
    <div class="bouncing-loader flex items-center justify-center w-full h-full">
      <div class="bg-red-300"></div>
      <div class="bg-cyan-300"></div>
      <div class="bg-yellow-300"></div>
    </div>
  </div>
</template>

<style scoped>
@keyframes bouncing-loader {
  to {
    opacity: 0.1;
    transform: translate3d(0, -1rem, 0);
  }
}
.bouncing-loader {
  display: flex;
  justify-content: center;
}
.bouncing-loader > div {
  width: 1.5rem;
  height: 1.5rem;
  margin: 6rem 1rem;
  border-radius: 50%;
  animation: bouncing-loader 0.6s infinite alternate;
}
.bouncing-loader > div:nth-child(2) {
  animation-delay: 0.2s;
}
.bouncing-loader > div:nth-child(3) {
  animation-delay: 0.4s;
}
</style>
