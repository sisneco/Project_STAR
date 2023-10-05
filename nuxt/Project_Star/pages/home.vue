<script setup lang="ts">
// LifeCicle
</script>

<template>
  <div
    class="flex p-8 md:p-12 lg:p-10 lg:justify-center bg-img flex-col gap-x-10 lg:flex-row h-full items-center lg:items-start bg-slate-50"
  >
    <div
      class="w-full md:w-2/4 flex flex-col items-center border border-gray-200"
    >
      <HomeInputForm />
      <div class="bg-white w-full p-8 flex flex-col gap-y-8">
        <section
          class="border border-gray-200 w-full h-[200px] rounded-md"
        ></section>
        <section
          class="border border-gray-200 w-full h-[200px] rounded-md"
        ></section>
        <section
          class="border border-gray-200 w-full h-[200px] rounded-md"
        ></section>
        <section
          class="border border-gray-200 w-full h-[200px] rounded-md"
        ></section>
        <section
          class="border border-gray-200 w-full h-[200px] rounded-md"
        ></section>
        <section
          class="border border-gray-200 w-full h-[200px] rounded-md"
        ></section>
      </div>
    </div>
    <section
      class="hidden md:flex bg-orange-200 w-1/4 h-[600px] p-4 sticky top-0 flex-col gap-y-6 rounded-xl"
    >
      <img
        src="https://placehold.jp/150x150.png"
        alt=""
        class="h-[150px] w-[150px]"
      />
      <h2 class="text-xl font-bold">すし</h2>
      <section class="w-full h-40 flex gap-x-2">
        <div
          class="bg-white w-1/3 h-full flex flex-col items-center p-4 gap-y-4"
        >
          <h3 class="text-xl">欲しい物</h3>
          <span class="text-5xl">10</span>
        </div>
        <div
          class="bg-white w-1/3 h-full flex flex-col items-center p-4 gap-y-4"
        >
          <h3 class="text-xl">買った物</h3>
          <span class="text-5xl">5</span>
        </div>
        <div
          class="bg-white w-1/3 h-full flex flex-col items-center p-4 gap-y-8"
        >
          <h3 class="text-xl">総額</h3>
          <span class="text-xl">¥100,000,000</span>
        </div>
      </section>
      <section>
        <h3>今最も欲しい物</h3>
      </section>
    </section>
  </div>
</template>
