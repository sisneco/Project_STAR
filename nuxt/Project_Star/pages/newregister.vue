<script setup>
//values
const nuxtApp = useNuxtApp();

const currentForm = new nuxtApp.$form(
  "name",
  "名前を入力してください！",
  "text"
);

nuxtApp.$form;
</script>

<template>
  <div
    class="flex p-8 md:p-12 lg:p-20 flex-col gap-y-8 lg:flex-row min-h-screen items-center justify-center"
  >
    <form
      class="w-full md:min-w-[400px] max-w-[550px] h-[600px] md:h-[750px] bg-white rounded-lg px-8 py-4 md:py-12 font-notojp flex flex-col gap-y-8"
    >
      <h2 class="text-4xl md:text-5xl font-oswald">INITIALIZE</h2>
      <label class="text-lg">{{ currentForm.placeholderText }}</label>
      <input
        type="text"
        id="tex1"
        autocomplete="off"
        class="w-full outline-none text-lg border p-4"
      />
      <label class="text-lg">test</label>
      <input
        type="text"
        id="text2"
        autocomplete="off"
        class="w-full outline-none text-lg border p-4"
      />

      <button
        class="w-full text-lg md:text-2xl text-white h-12 md:h-16 rounded-md font-bold p-2 bg-blue-500 mt-12"
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
