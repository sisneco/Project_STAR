<script setup lang="ts">
import LoadingModal from "../components/LoadingModal.vue";

onMounted(() => {
  document.getElementById("userId")?.focus();
});

// CONST
/** ページタグ：フォーム（テキストフィールド）表示 */
const PAGE_TAG_INPUT_INITALIZE_DATA = 1;
/** ページタグ：フォーム挿入要素確認 */
const PAGE_TAG_CONFIRM_INITALIZE_DATA = 2;

// VALUES
const pageTag: Ref<number> = ref(PAGE_TAG_INPUT_INITALIZE_DATA);

// form parameter
const userId: Ref<string> = ref("");
const userName: Ref<string> = ref("");

// USE IMPORT VALUES
const nuxtApp = useNuxtApp();
const loadingModal = ref<InstanceType<typeof LoadingModal> | null>(null);

// METHODS
function btnNextAction() {
  if (pageTag.value === PAGE_TAG_INPUT_INITALIZE_DATA) {
    //TODO 同一ユーザーID確認処理
    ++pageTag.value;
  } else {
    return navigateTo({
      path: "/home",
    });
  }
}

function btnBackAction() {
  --pageTag.value;
}

/**
 * フォームボタン活性条件のラッパーメソッド
 * @returns true:非活性 false:活性
 */
function isDisabledFormButton(): boolean {
  return hasValidErrorUserId() || hasValidErrorUserName();
}

/**
 * バリデーションチェック[ユーザーID]
 *  @returns true:エラー false:正常
 */
function hasValidErrorUserId(): boolean {
  const target: string = userId.value;

  // 1. 空白チェック
  if (target === "") {
    return true;
  }

  // 2. 範囲チェック
  if (target.length < 4 || 8 < target.length) {
    return true;
  }

  //TODO 3. 英数字チェック（正規表現？）

  return false;
}

/**
 * バリデーションチェック[ユーザー名]
 *  @returns true:エラー false:正常
 */
function hasValidErrorUserName() {
  const target: string = userName.value;

  if (target === "") {
    return true;
  }

  if (10 < target.length) {
    return true;
  }

  return false;
}

/**
 * 登録ボタンクリック時の処理
 */
async function btnRegisterAction() {
  const db: any = nuxtApp.$db;

  interface addJsonParameterFormat {
    userId: string;
    userName: string;
  }

  const addJsonParameter: addJsonParameterFormat = {
    userId: userId.value,
    userName: userName.value,
  };

  // 登録処理（ローディングモーダルで制御）
  loadingModal.value?.switchIsVisibleLoadingWindow();
  db.addJsonParameter = await db.collection("items").add(addJsonParameter);
  loadingModal.value?.switchIsVisibleLoadingWindow();
}

// COMPUTED
const formColumnText = computed(() => {
  return pageTag.value === PAGE_TAG_INPUT_INITALIZE_DATA
    ? "INITIALIZE"
    : "CONFIRM";
});

const formHelpText = computed(() => {
  return pageTag.value === PAGE_TAG_INPUT_INITALIZE_DATA
    ? "初期設定に必要な項目を入力してください。"
    : "項目内容が正しいか確認してください。";
});

const buttonNextText = computed(() => {
  return pageTag.value === PAGE_TAG_INPUT_INITALIZE_DATA ? "次へ" : "登録";
});
</script>

<template>
  <div
    class="flex p-8 md:p-12 lg:p-20 flex-col gap-y-8 lg:flex-row min-h-screen items-center justify-center"
  >
    <form
      class="w-full md:min-w-[400px] max-w-[550px] h-[600px] md:h-[750px] bg-white rounded-lg px-8 py-4 md:py-12 font-notojp flex flex-col gap-y-4"
    >
      <h2 class="text-4xl md:text-5xl font-oswald">{{ formColumnText }}</h2>
      <p>{{ formHelpText }}</p>
      <div class="flex flex-col">
        <label class="text-lg">ユーザーID </label>
        <p class="text-sm text-red-500">※半角4文字～8文字の半角英数字</p>
      </div>
      <input
        type="text"
        id="userId"
        autocomplete="off"
        placeholder="whastar"
        v-model="userId"
        class="w-full outline-none text-lg border p-4"
        v-if="pageTag == PAGE_TAG_INPUT_INITALIZE_DATA"
      />
      <p
        class="w-full text-lg p-4 bg-gray-100 text-gray-500"
        v-else-if="pageTag === PAGE_TAG_CONFIRM_INITALIZE_DATA"
      >
        {{ userId }}
      </p>
      <div class="flex flex-col">
        <label class="text-lg">ユーザー名</label>
        <p class="text-sm text-red-500">※名前は後からでも変更できます</p>
      </div>
      <input
        type="text"
        id="userName"
        autocomplete="off"
        placeholder="ほわすた"
        v-model="userName"
        class="w-full outline-none text-lg border p-4"
        v-if="pageTag === PAGE_TAG_INPUT_INITALIZE_DATA"
      />
      <p
        class="w-full text-lg p-4 bg-gray-100 text-gray-500"
        v-else-if="pageTag === PAGE_TAG_CONFIRM_INITALIZE_DATA"
      >
        {{ userName }}
      </p>

      <button
        class="w-full text-lg md:text-2xl text-white h-12 md:h-16 rounded-md font-bold p-2 mt-12 outline-none"
        :class="{
          'bg-blue-300 pointer-events-none': isDisabledFormButton(),
          'bg-blue-500': !isDisabledFormButton(),
        }"
        @click.prevent="btnNextAction()"
        :disabled="isDisabledFormButton()"
      >
        {{ buttonNextText }}
      </button>

      <button
        class="w-full text-lg md:text-2xl h-12 md:h-16 rounded-md font-bold p-2 text-blue-500 border border-blue-500 outline-none"
        v-if="pageTag !== PAGE_TAG_INPUT_INITALIZE_DATA"
        @click.prevent="btnBackAction()"
      >
        戻る
      </button>
    </form>
  </div>
</template>
