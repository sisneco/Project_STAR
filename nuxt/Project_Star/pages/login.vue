<script setup>
// LifeCicle
onMounted(() => {
  // RUN ====>
  createFirebaseUI();
});

// Values
const email = ref();
const password = ref();

const nuxtApp = useNuxtApp();
const firebase = nuxtApp.$firebase;

// Methods

/**
 * FirebaseUIのコンテナを作成するメソッド
 * firebaseuiはDOM操作を必要とするため、mountedの後実行する
 */
async function createFirebaseUI() {
  const firebaseui = await import("firebaseui");

  const ui = new firebaseui.auth.AuthUI(nuxtApp.$auth);

  const uiConfig = {
    signInSuccessUrl: "/",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  };

  ui.start("#firebaseui-auth-container", uiConfig);
}

/**
 * firebaseAuthを使ったログインメソッド
 * バリデーションチェック,ボタン制御を内包したラッパーメソッドである
 */
function login() {
  //TODO Button:Disabled

  //TODO validationCheck

  // Challange Login
  nuxtApp.$auth
    .signInWithEmailAndPassword(email.value, password.value)
    .then((result) => {
      // Success
      console.log("hoge");
    })
    .catch((err) => {
      // Bad
      console.log(err);
    });
}

/**
 * ログイン時に使用する値をバリデーションチェック
 * チェック,エラー時の動きを内包したラッパーメソッド
 */
function validationLogin() {}

/**
 * 文字列のルールでエラーがないか確認するメソッド
 * 1. 空白/null/undefined -> 異常
 * 2. 引数「maxLen」より大きい場合 -> 異常
 * @param target 対象の値
 * @param maxLen 対象の最大の長さ
 * @return true:異常 false:正常
 */
function hasTextRuleError(target, maxLen) {
  // 1...
  if (target === null || target === undefined || target.length === 0) {
    return true;
  }

  // 2...
  if (maxLen < target.length) {
    return true;
  }

  return false;
}
</script>

<template>
  <div
    class="flex p-8 md:p-12 lg:p-20 lg:justify-between bg-img flex-col gap-y-8 lg:flex-row h-full items-center lg:items-start"
  >
    <section class="flex flex-col gap-y-4 font-notojp pb-4 md:pb-0">
      <h1
        class="text-4xl md:text-6xl lg:text-8xl font-oswald text-white md:border-b md:pb-2"
      >
        What do you want ?
      </h1>
      <p class="text-sm md:text-base lg:text-lg text-white hidden md:block">
        ほわすたを使って いつまでも どこまでも 仲良く
      </p>
    </section>
    <form
      class="w-full md:min-w-[400px] max-w-[550px] h-[600px] md:h-[750px] bg-white rounded-lg px-8 py-4 md:py-12 font-notojp flex flex-col gap-y-8"
      @submit.prevent="login"
    >
      <h2 class="text-4xl md:text-5xl font-oswald">Sign In</h2>
      <div class="w-full flex flex-col gap-y-2 md:gap-y-4">
        <label for="email" class="text-base md:text-2xl">Email</label>
        <input
          type="email"
          v-model="email"
          class="w-full text-base md:text-2xl rounded-md border p-2 md:p-4 outline-gray-300"
        />

        <div class="w-full h-full flex flex-col gap-y-4">
          <label for="password" class="text-base md:text-2xl">Password</label>
          <input
            type="password"
            v-model="password"
            class="w-full text-base md:text-2xl rounded-md border p-2 md:p-4 outline-gray-300"
          />
        </div>
      </div>
      <button
        class="w-full text-lg md:text-2xl text-white bg-blue-500 h-12 md:h-16 rounded-md font-bold hover:bg-blue-600 p-2"
      >
        サインイン
      </button>
      <div id="firebaseui-auth-container" class="w-max mx-auto google"></div>
      <a
        href=""
        class="text-xs md:text-xl text-gray-700 mx-auto border-b border-b-gray-400 pb-1"
        >アカウントをお持ちではありませんか？</a
      >
    </form>
  </div>
</template>

<style scoped>
.bg-img {
  background-image: url("~/assets/img/test.jpg");
  background-size: 100%;
}

@media (min-width: 768px) {
  .google {
    --tw-scale-x: 1.75;
    --tw-scale-y: 1.75;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y))
      rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
      scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
}
</style>
