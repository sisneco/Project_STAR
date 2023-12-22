<script setup lang="ts">
// VALUES
const isVisibleLoadingWindow: Ref<boolean> = ref(true);
const itemId: Ref<string> = ref("");

// USE IMPORT VALUES
const nuxtApp = useNuxtApp();
const db: any = nuxtApp.$db;

// METHODS
function switchIsVisibleLoadingWindow(param: string): void {
  console.log(itemId.value);
  itemId.value = param;
  console.log(param);
  isVisibleLoadingWindow.value = !isVisibleLoadingWindow.value;
}

async function deleteItem(): Promise<void> {
  await db.collection("items").doc(itemId.value).delete();
}

defineExpose({
  isVisibleLoadingWindow,
  switchIsVisibleLoadingWindow,
});
</script>

<template>
  <div
    class="fixed top-0 left-0 z-50 w-full h-full bg-black opacity-50 flex justify-center items-center"
    v-if="isVisibleLoadingWindow"
  ></div>
  <div
    class="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center"
    v-if="isVisibleLoadingWindow"
  >
    <div
      class="bg-white h-1/2 w-1/2 z-30 flex flex-col justify-center items-center gap-y-12 animate-slide-bottom"
    >
      <p class="text-5xl">削除しますか？</p>
      <div class="flex gap-x-4">
        <button
          class="w-24 md:w-32 p-2 rounded-sm text-blue-500 font-bold font-sans border border-blue-500"
          @click="switchIsVisibleLoadingWindow('')"
        >
          キャンセル
        </button>

        <button
          class="w-24 md:w-32 rounded-sm p-2 text-white font-bold font-sans bg-blue-500"
          @click="deleteItem()"
        >
          削除する
        </button>
      </div>
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
