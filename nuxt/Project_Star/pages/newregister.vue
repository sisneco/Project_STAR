<script setup lang="ts">
// CONST
const PAGE_TAG_INPUT_INITALIZE_DATA = 1;

// VALUES
const pageTag: Ref<number> = ref(PAGE_TAG_INPUT_INITALIZE_DATA);

// METHODS
function btnNextAction() {
  ++pageTag.value;
}
</script>

<template>
  <div
    class="flex p-8 md:p-12 lg:p-20 flex-col gap-y-8 lg:flex-row min-h-screen items-center justify-center"
  >
    <form
      class="w-full md:min-w-[400px] max-w-[550px] h-[600px] md:h-[750px] bg-white rounded-lg px-8 py-4 md:py-12 font-notojp flex flex-col gap-y-4"
    >
      <h2 class="text-4xl md:text-5xl font-oswald">INITIALIZE</h2>
      <div
        class="flex gap-y-4 flex-col"
        v-if="pageTag === PAGE_TAG_INPUT_INITALIZE_DATA"
      >
        <div class="flex flex-col">
          <label class="text-lg">IDを入力してください </label>
          <p class="text-sm text-red-500">※半角4文字～8文字の半角英数字</p>
        </div>
        <input
          type="text"
          id="tex1"
          autocomplete="off"
          placeholder="whastar"
          class="w-full outline-none text-lg border p-4"
        />
        <div class="flex flex-col">
          <label class="text-lg">名前を入力してください </label>
          <p class="text-sm text-red-500">※名前は後からでも変更できます</p>
        </div>
        <input
          type="text"
          id="text2"
          autocomplete="off"
          placeholder="ほわすた"
          class="w-full outline-none text-lg border p-4"
        />
      </div>

      <button
        class="w-full text-lg md:text-2xl text-white h-12 md:h-16 rounded-md font-bold p-2 bg-blue-500 mt-12"
        @click.prevent="btnNextAction()"
      >
        次へ
      </button>

      <button
        class="w-full text-lg md:text-2xl h-12 md:h-16 rounded-md font-bold p-2 text-blue-500 border border-blue-500"
      >
        戻る
      </button>
    </form>
  </div>
</template>
