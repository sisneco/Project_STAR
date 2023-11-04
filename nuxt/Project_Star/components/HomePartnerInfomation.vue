<template>
  <section
    class="hidden md:flex bg-pink-200 w-full h-[600px] p-4 sticky top-0 flex-col gap-y-6 rounded-xl"
  >
    <img
      src="https://placehold.jp/150x150.png"
      alt=""
      class="h-[150px] w-[150px]"
    />
    <h2 class="text-xl font-bold">たぬき</h2>
    <section class="w-full h-40 flex gap-x-2">
      <div class="bg-white w-1/3 h-full flex flex-col items-center p-4 gap-y-4">
        <h3 class="text-xl">欲しい物</h3>
        <span class="text-5xl">10</span>
      </div>
      <div class="bg-white w-1/3 h-full flex flex-col items-center p-4 gap-y-4">
        <h3 class="text-xl">買った物</h3>
        <span class="text-5xl">5</span>
      </div>
      <div class="bg-white w-1/3 h-full flex flex-col items-center p-4 gap-y-8">
        <h3 class="text-xl">総額</h3>
        <span class="text-xl">¥100,000,000</span>
      </div>
    </section>
    <section>
      <h3>今最も欲しい物</h3>
    </section>
  </section>
</template>
