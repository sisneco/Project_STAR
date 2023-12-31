<script setup lang="ts">
// USE IMPORT VALUES
const nuxtApp = useNuxtApp();

const db: any = nuxtApp.$db;

const userInfoItem: Ref<any[]> = ref([]);
featchUserInfo();

const props = defineProps({
  userId: String,
});

// METHODS
/**
 * 欲しいものリストを取得
 */
async function featchUserInfo() {
  console.log(props.userId);
  console.log(userStore().userId);

  await db
    .collection("items")
    .where("userId", "==", props.userId)
    .onSnapshot((querySnapshot: any) => {
      userInfoItem.value = new Array();
      querySnapshot.forEach((doc: any) => {
        console.log(doc);
        let tmp = null;
        tmp = doc.data();
        tmp.id = doc.id;
        userInfoItem.value.push(tmp);
      });
    });
}

// COMPUTED
const getBoughtCount = computed(() => {
  return userInfoItem.value.filter((val) => val.isBuy).length;
});

const getWishCount = computed(() => {
  return userInfoItem.value.length - getBoughtCount.value;
});

const getBoughtMoney = computed(() => {
  let sumMoney = 0;
  userInfoItem.value
    .filter((val) => val.isBuy)
    .forEach((v) => (sumMoney += v.price));
  return sumMoney;
});
</script>

<template>
  <section
    class="hidden md:flex bg-orange-200 w-full h-[500px] p-4 top-0 flex-col gap-y-6 rounded-xl"
  >
    <h2 class="text-xl font-bold">すし</h2>
    <section class="w-full h-40 flex gap-x-2">
      <div class="bg-white w-1/3 h-full flex flex-col items-center p-4 gap-y-4">
        <h3 class="text-xl">欲しい数</h3>
        <span class="text-5xl">{{ getWishCount }}</span>
      </div>
      <div class="bg-white w-1/3 h-full flex flex-col items-center p-4 gap-y-4">
        <h3 class="text-xl">買った数</h3>
        <span class="text-5xl">{{ getBoughtCount }}</span>
      </div>
      <div class="bg-white w-1/3 h-full flex flex-col items-center p-4 gap-y-8">
        <h3 class="text-xl">総額</h3>
        <span class="text-xl">¥{{ getBoughtMoney.toLocaleString() }}</span>
      </div>
    </section>
    <section>
      <h3>今最も欲しい物</h3>
    </section>
  </section>
</template>
