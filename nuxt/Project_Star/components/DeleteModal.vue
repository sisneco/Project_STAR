<script setup lang="ts">
// VALUES
const isVisibleLoadingWindow: Ref<boolean> = ref(false);
const itemId: Ref<string> = ref("");

const top = ref(0);
const left = ref(0);

// USE IMPORT VALUES
const nuxtApp = useNuxtApp();
const db: any = nuxtApp.$db;

// CONST VALUE

// METHODS
function switchIsVisibleLoadingWindow(param: string): void {
  isVisibleLoadingWindow.value = !isVisibleLoadingWindow.value;

  //TODO スクロール禁止　解除実装（別メソッドで分割）
  function disableScroll(event: any) {
    event.preventDefault();
  }

  itemId.value = param;
}

async function deleteItem(): Promise<void> {
  await db.collection("items").doc(itemId.value).delete();

  isVisibleLoadingWindow.value = !isVisibleLoadingWindow.value;
}

defineExpose({
  isVisibleLoadingWindow,
  switchIsVisibleLoadingWindow,
});
</script>

<template>
  <div
    class="fixed top-0 left-0 z-40 w-screen h-screen bg-black opacity-40"
    v-if="isVisibleLoadingWindow"
  ></div>

  <div
    class="fixed top-0 left-0 z-50 flex justify-center items-center w-screen h-screen"
    v-if="isVisibleLoadingWindow"
  >
    <div
      class="bg-white h-[400px] w-[380px] flex flex-col justify-center items-center rounded-xl p-7 gap-y-3"
      :style="{ top: top + 'px', left: left + 'px' }"
    >
      <h4 class="font-sans font-bold text-xl text-black">
        本当に削除してよろしいですか？
      </h4>
      <p class="text-sm text-gray-500">
        この投稿を削除すると自分、パートナーから表示が消えます。また、情報としても削除されるため、合計金額や買った数等が減る場合があります。
      </p>
      <button
        class="bg-red-500 w-full text-white rounded-full text-xl py-4 font-sans font-bold"
        @click="deleteItem()"
      >
        削除
      </button>

      <button
        class="w-full rounded-full text-xl py-4 font-sans font-bold border border-gray-400"
        @click="isVisibleLoadingWindow = false"
      >
        キャンセル
      </button>
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
