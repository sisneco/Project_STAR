<script setup lang="ts">
interface wishItem {
  itemName: string;
  priority: string;
  itemUrl: string;
  memo: string;
  price: number;
  uid: string;
  id: string;
}

const props = defineProps({
  wishList: Array<wishItem>,
});
</script>

<template>
  <section
    class="border border-gray-200 w-full h-[200px] rounded-md p-4 flex flex-col gap-y-2"
    v-for="wishItem in wishList"
  >
    <div class="flex items-end gap-x-2 text-xl">
      <h3 class="text-2xl font-serif">すし</h3>
      <span class="text-xl text-gray-400">@sushi_kuitai </span>
      <span v-for="n in 5"> ★ </span>
    </div>
    <div class="flex items-end text-4xl gap-x-1">
      <p class="font-bold">{{ wishItem.itemName }}</p>
      <p class="text-3xl">¥ {{ wishItem.price }}</p>
    </div>
    <a
      :href="wishItem.itemUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="text-blue-400"
      v-if="wishItem.itemUrl !== ''"
      >{{ wishItem.itemUrl }}
    </a>
  </section>
</template>
