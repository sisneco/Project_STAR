<script setup lang="ts">
import HomeWishSection from "./HomeWishSection.vue";

// USE IMPORT VALUES
const nuxtApp = useNuxtApp();

const db: any = nuxtApp.$db;

const wishList: Ref<any[]> = ref([]);
featchWishList();

// METHODS
/**
 * 欲しいものリストを取得
 */
async function featchWishList() {
  await db
    .collection("items")
    .where("userId", "in", [userStore().userId, userStore().partnerUserId])
    .onSnapshot((querySnapshot: any) => {
      wishList.value = new Array();
      querySnapshot.forEach((doc: any) => {
        let tmp = null;
        tmp = doc.data();
        tmp.id = doc.id;
        wishList.value.push(tmp);
      });

      if (wishList.value.length) {
        wishList.value.sort((a, b) => b["createdAt"] - a["createdAt"]);
      }
    });
}
</script>

<template>
  <div class="bg-white w-full p-8 flex flex-col gap-y-8">
    <HomeWishSection :wishList="wishList" />
  </div>
</template>
