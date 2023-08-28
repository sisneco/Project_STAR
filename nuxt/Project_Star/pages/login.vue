<script setup></script>

<template>
  <div class="flex p-16 md:p-20 justify-between bg-img">
    <section class="flex flex-col gap-y-4 font-notojp">
      <h1 class="text-9xl font-oswald text-white">Wh' Star</h1>
      <p class="text-lg text-white">
        ほわすたを使って いつまでも どこまでも 仲良く
      </p>
    </section>
    <form
      class="w-full max-w-[600px] h-[75vh] md:h-[860px] bg-white rounded-lg px-8 py-12 font-notojp flex flex-col gap-y-8"
    >
      <h2 class="text-5xl">サインイン</h2>

      <div class="w-full flex flex-col gap-y-4">
        <label for="email" class="text-2xl">Email</label>
        <input type="text" class="w-full text-2xl rounded-md border p-4" />

        <div class="w-full h-full flex flex-col gap-y-4">
          <label for="email" class="text-2xl">Password</label>
          <input type="text" class="w-full text-2xl rounded-md border p-4" />
        </div>
      </div>
      <button
        class="w-1/2 text-2xl text-white bg-blue-500 h-16 rounded-md font-bold"
      >
        サインイン
      </button>
      <div class="w-full border">
        <google />
        <a href=""> </a>
      </div>
    </form>
  </div>
</template>

<style>
.bg-img {
  background-image: url("~/assets/img/test.jpg");
  background-size: 100%;
}
</style>
