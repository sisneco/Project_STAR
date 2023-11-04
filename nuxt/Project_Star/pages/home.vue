<script setup lang="ts">
// LifeCicle
</script>

<template>
  <div
    class="flex p-8 md:p-12 lg:p-10 lg:justify-center bg-img flex-col gap-x-10 lg:flex-row h-full items-center lg:items-start bg-slate-50 min-h-screen"
  >
    <div
      class="hidden md:flex items-end w-1/6 [writing-mode:vertical-rl] text-[10em] font-bold text-gray-300 font-oswald"
    >
      <h2>Wha't star</h2>
    </div>
    <div
      class="w-full md:w-3/6 flex flex-col items-center border border-gray-200"
    >
      <HomeInputForm />
      <div class="bg-white w-full p-8 flex flex-col gap-y-8">
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
            ずっと前から欲しかったロードバイクです。趣味に200万なんてって思うかもですが、次のレースで本気に勝ちに行きたいの...
          </p>
        </section>
      </div>
    </div>
    <div class="hidden md:flex flex-col w-2/6 gap-y-6">
      <HomeMyInfomation />
      <HomePartnerInfomation />
    </div>
  </div>
</template>
