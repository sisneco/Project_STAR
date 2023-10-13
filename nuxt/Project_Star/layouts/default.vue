<template>
  <Header />
  <main class="min-h-screen font-notojp bg-img">
    <slot />
  </main>
  <Footer />
</template>

<style scoped>
.bg-img {
  background-image: url("~/assets/img/test.jpg");
  background-size: cover;
}
</style>
