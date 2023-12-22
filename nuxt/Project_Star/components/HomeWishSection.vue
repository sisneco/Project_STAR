<script setup lang="ts">
interface wishItem {
  itemName: string;
  priority: string;
  itemUrl: string;
  memo: string;
  price: number;
  uid: string;
  userId: string;
  userName: string;
  id: string;
}

const props = defineProps({
  wishList: Array<wishItem>,
});

const confirmModal = ref();

// METHODS
function btnTrashAction(itemId: string) {
  confirmModal.value.switchIsVisibleLoadingWindow(itemId);
}
</script>

<template>
  <section
    class="border border-gray-200 w-full h-[200px] rounded-md p-4 flex flex-col gap-y-2 relative"
    v-for="wishItem in wishList"
  >
    <div class="flex items-start gap-x-2 text-xl">
      <h3 class="text-2xl font-serif">すし</h3>
      <span class="text-xl text-gray-400">@{{ wishItem.userId }} </span>
      <span v-for="n in parseInt(wishItem.priority)" class="text-yellow-300">
        ★
      </span>
    </div>
    <div class="flex flex-col">
      <p class="text-3xl">{{ wishItem.itemName }}</p>
      <p class="text-2xl">¥ {{ wishItem.price.toLocaleString() }}</p>
    </div>
    <a
      :href="wishItem.itemUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="text-blue-400"
      v-if="wishItem.itemUrl !== ''"
      >{{ wishItem.itemUrl }}
    </a>
    <div class="flex h-6 w-full absolute bottom-4 left-4 gap-x-24">
      <font-awesome-icon icon="fa-solid fa-check" class="text-green-400" />
      <font-awesome-icon
        icon="fa-solid fa-rotate-right"
        class="text-yellow-200"
      />
      <font-awesome-icon
        icon="fa-solid fa-trash"
        class="text-gray-400"
        @click="btnTrashAction(wishItem.id)"
      />
    </div>
  </section>
  <ConfirmModal ref="confirmModal" />
</template>
