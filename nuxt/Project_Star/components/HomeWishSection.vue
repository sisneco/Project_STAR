<script setup lang="ts">
// USE IMPORT VALUES
const nuxtApp = useNuxtApp();
const db: any = nuxtApp.$db;

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
  isBuy: boolean;
}

const props = defineProps({
  wishList: Array<wishItem>,
});

const deleteModal = ref();

// METHODS
async function btnBuyAction(itemId: string) {
  const userRef = db.collection("items").doc(itemId);
  await userRef.update({
    isBuy: true,
  });
}

async function btnResetBuyAction(itemId: string) {
  const userRef = db.collection("items").doc(itemId);
  await userRef.update({
    isBuy: false,
  });
}

function btnTrashAction(itemId: string) {
  deleteModal.value.switchIsVisibleLoadingWindow(itemId);
}
</script>

<template>
  <section
    class="border border-gray-200 w-full rounded-md p-4 flex flex-col gap-y-3 relative text-gray-500"
    v-for="wishItem in wishList"
  >
    <div class="flex flex-col md:flex-row gap-x-2 text-xl">
      <div class="flex items-center gap-x-2">
        <h3 class="text-2xl font-serif">すし</h3>
        <span class="text-base md:text-xl text-gray-400"
          >@{{ wishItem.userId }}
        </span>
      </div>
      <p>
        <span v-for="n in parseInt(wishItem.priority)" class="text-yellow-300">
          ★
        </span>
      </p>
    </div>
    <p class="text-3xl font-sans">{{ wishItem.itemName }}</p>
    <p class="text-2xl">¥ {{ wishItem.price.toLocaleString() }}</p>

    <a
      :href="wishItem.itemUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="text-blue-400"
      v-if="wishItem.itemUrl !== ''"
      >{{ wishItem.itemUrl }}
    </a>
    <p>{{ wishItem.memo }}</p>
    <div
      class="flex h-6 w-full gap-x-8 md:gap-x-24 text-gray-400"
      id="icon-box"
    >
      <font-awesome-icon
        icon="fa-solid fa-face-smile-wink"
        class="cursor-pointer"
        v-if="wishItem.isBuy"
        @click="btnResetBuyAction(wishItem.id)"
      />
      <font-awesome-icon
        icon="fa-solid fa-check"
        class="cursor-pointer"
        v-else
        @click="btnBuyAction(wishItem.id)"
      />

      <font-awesome-icon icon="fa-solid fa-rotate-right" />
      <font-awesome-icon
        icon="fa-solid fa-trash"
        class="cursor-pointer"
        @click="btnTrashAction(wishItem.id)"
      />
    </div>
  </section>
  <DeleteModal ref="deleteModal" />
</template>

<style scoped>
#icon-box > svg {
  width: 21px;
}
</style>
