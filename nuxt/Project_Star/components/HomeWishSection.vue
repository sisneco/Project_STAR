<script setup lang="ts">
const props = defineProps({
  result: {},
});
const { result } = props;

console.log(result);
console.log("Hello");
</script>

<template>
  <section
    class="border border-gray-200 w-full h-[200px] rounded-md p-4 flex flex-col gap-y-2"
  >
    <div class="flex items-end gap-x-2 text-xl">
      <h3 class="text-2xl font-serif">すし</h3>
      <span class="text-xl text-gray-400">@sushi_kuitai </span>
      <span v-for="n in 5"> ★ </span>
    </div>
    <div class="flex items-end text-4xl gap-x-1">
      <p class="font-bold">DOGMA F</p>
      <p class="text-3xl">¥450,000</p>
    </div>
    <a
      href="https://online.ysroad.co.jp/shop/g/g2022000005708/"
      target="_blank"
      rel="noopener noreferrer"
      class="text-blue-400"
      >https://online.ysroad.co.jp/shop/g/g2022000005708/</a
    >
    <p>
      {{ result }}
    </p>
  </section>
</template>
