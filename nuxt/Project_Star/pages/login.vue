<script setup>
// LIFECYCLE
onMounted(() => {
  // RUN ====>
  createFirebaseUI();

  document.getElementById("email").focus();
});

definePageMeta({
  middleware: ["redirect"],
});

console.log(userStore().isSettingStoreValue);

// VALUES
const email = ref();
const password = ref();

// HTML ACTION VALUES
const hasLoginError = ref(false);
const goLoginErrorAnimation = ref(false);
const isVisibleLoadingWindow = ref(false);

// USE IMPORT VALUES
const nuxtApp = useNuxtApp();

const firebase = nuxtApp.$firebase;
// METHODS

/**
 * FirebaseUIのコンテナを作成するメソッド
 * firebaseuiはDOM操作を必要とするため、mountedの後実行する
 */
async function createFirebaseUI() {
  const firebaseui = await import("firebaseui");

  const ui = new firebaseui.auth.AuthUI(nuxtApp.$auth);

  const uiConfig = {
    signInSuccessUrl: "/home",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  };

  ui.start("#firebaseui-auth-container", uiConfig);
}

/**
 * firebaseAuthを使ったログインメソッド
 * バリデーションチェック,ボタン制御を内包したラッパーメソッドである
 */
function login() {
  // initialize value
  goLoginErrorAnimation.value = false;
  isVisibleLoadingWindow.value = true;

  // challange login
  nuxtApp.$auth
    .signInWithEmailAndPassword(email.value, password.value)
    .then((result) => {
      userStore().setUid(result.user.uid);

      console.log("hoge");
      // success
      return navigateTo({
        path: "/home",
      });
    })
    .catch((err) => {
      hasLoginError.value = true;
      goLoginErrorAnimation.value = true;
      isVisibleLoadingWindow.value = false;
    });
}

/**
 * 文字列のルールでエラーがないか確認するメソッド
 * 1. 空白/null/undefined -> 異常
 * 2. 引数「maxLen」より大きい場合 -> 異常
 * @param target 対象の値
 * @param maxLen 対象の最低限の長さ
 * @param minLen 対象の最大限の長さ
 * @return true:異常 false:正常
 */
function hasTextRuleError(target, minLen, maxLen) {
  // 1...
  if (target === null || target === undefined || target.length === 0) {
    return true;
  }

  // 2...
  if (target.length < minLen || maxLen < target.length) {
    return true;
  }

  return false;
}

/**
 * ログインボタンをクリックできるか判定
 */
function canClickLoginButton() {
  // 定数
  const EMAIL_MIN_LENGTH = 1;
  const EMAIL_MAX_LENGTH = 256;

  const PASSWORD_MIN_LENGTH = 4;
  const PASSWORD_MAX_LENGTH = 12;

  return !(
    hasTextRuleError(email.value, EMAIL_MIN_LENGTH, EMAIL_MAX_LENGTH) ||
    hasTextRuleError(password.value, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH)
  );
}
</script>

<template>
  <div
    class="fixed top-0 left-0 bg-gray-100 z-50 w-full h-full opacity-50"
    v-if="isVisibleLoadingWindow"
  >
    <div class="bouncing-loader flex items-center justify-center w-full h-full">
      <div class="bg-red-300"></div>
      <div class="bg-cyan-300"></div>
      <div class="bg-yellow-300"></div>
    </div>
  </div>
  <div
    class="flex p-8 md:p-12 lg:p-20 lg:justify-between flex-col gap-y-8 lg:flex-row min-h-screen items-center"
  >
    <section class="flex flex-col gap-y-4 font-notojp pb-4 md:pb-0">
      <h1
        class="text-4xl md:text-6xl lg:text-8xl font-oswald text-white md:border-b md:pb-2 md:border-b-blue-300"
      >
        What do you want ?
      </h1>
      <p class="text-sm md:text-base lg:text-lg hidden md:block text-blue-100">
        ほわすたを使って いつまでも どこまでも 仲良く
      </p>
    </section>
    <form
      class="w-full md:min-w-[400px] max-w-[550px] h-[600px] md:h-[750px] bg-white rounded-lg px-8 py-4 md:py-12 font-notojp flex flex-col gap-y-8"
      @submit.prevent="login"
    >
      <h2 class="text-4xl md:text-5xl font-oswald">SignIn</h2>
      <p
        class="text-red-600 font-bold"
        :class="[
          { 'animate-vibrate-1': goLoginErrorAnimation },
          { hidden: !hasLoginError },
          { block: hasLoginError },
        ]"
      >
        メールアドレスまたはパスワードが異なります。
      </p>
      <div class="w-full flex flex-col gap-y-2 md:gap-y-4">
        <label for="email" class="text-base md:text-xl">Email</label>
        <input
          id="email"
          type="email"
          v-model="email"
          class="w-full text-sm md:text-lg rounded-md border p-2 md:p-4 outline-blue-100"
        />

        <div class="w-full h-full flex flex-col gap-y-4">
          <label for="password" class="text-base md:text-xl">Password</label>
          <input
            type="password"
            v-model="password"
            class="w-full text-sm md:text-lg rounded-md border p-2 md:p-4 outline-blue-100"
          />
        </div>
      </div>
      <button
        class="w-full text-lg md:text-2xl text-white h-12 md:h-16 rounded-md font-bold p-2"
        v-bind:disabled="!canClickLoginButton()"
        :class="[
          { 'bg-blue-500': canClickLoginButton() },
          { 'bg-gray-300': !canClickLoginButton() },
          { 'hover:bg-blue-600': canClickLoginButton() },
        ]"
      >
        サインイン
      </button>
      <div id="firebaseui-auth-container" class="mx-auto google"></div>
      <a
        href=""
        class="text-xs md:text-xl text-gray-700 mx-auto border-b border-b-gray-400 pb-1"
        >アカウントをお持ちではありませんか？</a
      >
    </form>
  </div>
</template>

<style scoped>
@media (min-width: 768px) {
  .google {
    --tw-scale-x: 1.5;
    --tw-scale-y: 1.5;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y))
      rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
      scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
}

@keyframes bouncing-loader {
  to {
    opacity: 0.1;
    transform: translate3d(0, -1rem, 0);
  }
}
.bouncing-loader {
  display: flex;
  justify-content: center;
}
.bouncing-loader > div {
  width: 1.5rem;
  height: 1.5rem;
  margin: 6rem 1rem;
  border-radius: 50%;
  animation: bouncing-loader 0.6s infinite alternate;
}
.bouncing-loader > div:nth-child(2) {
  animation-delay: 0.2s;
}
.bouncing-loader > div:nth-child(3) {
  animation-delay: 0.4s;
}
</style>
