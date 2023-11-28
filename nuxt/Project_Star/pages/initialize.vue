<script setup lang="ts">
import LoadingModal from "../components/LoadingModal.vue";

onMounted(() => {
  document.getElementById("userId")?.focus();
});

// CONST
/** ページタグ：フォーム（テキストフィールド）表示 */
const PAGE_TAG_INPUT_INITIALIZE_DATA = 1;
/** ページタグ：フォーム挿入要素確認 */
const PAGE_TAG_CONFIRM_INITIALIZE_DATA = 2;
/** ページタグ：登録完了 */
const PAGE_TAG_COMPLATE_INITIALIZE_DATA = 3;
/** ページタグ：パートナーフォーム(テキストフィールド)表示 */
const PAGE_TAG_INPUT_PARTNER_DATA = 4;
/** ページタグ：パートナーフォーム要素確認 */
const PAGE_TAG_CONFIRM_PARTNER_DATA = 5;
/** ページタグ：登録完了（パートナーID） */
const PAGE_TAG_COMPLATE_PARTNER_DATA = 6;

// ENUM
enum BtnType {
  next = 0,
  back = 1,
  register = 2,
  notRegister = 3,
  finish = 4,
}

// VALUES
const pageTag: Ref<number> = ref(PAGE_TAG_INPUT_INITIALIZE_DATA);

// form parameter
const userId: Ref<string> = ref("");
const userName: Ref<string> = ref("");
const partnerId: Ref<string> = ref("");

// USE IMPORT VALUES
const nuxtApp = useNuxtApp();
const loadingModal = ref<InstanceType<typeof LoadingModal> | null>(null);

// METHODS
function btnNextAction() {
  ++pageTag.value;
}

function btnBackAction() {
  --pageTag.value;
}

/**
 * バリデーションチェック[ユーザーID]
 *  @returns true:エラー false:正常
 */
function hasValidErrorUserId(target: string): boolean {
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
    partnerUId: string;
    userId: string;
    userName: string;
  }

  const addJsonParameter: addJsonParameterFormat = {
    partnerUId: partnerId.value,
    userId: userId.value,
    userName: userName.value,
  };

  // 登録処理（ローディングモーダルで制御）
  loadingModal.value?.switchIsVisibleLoadingWindow();
  await db.collection("users").doc(userStore().uid).set(addJsonParameter);
  loadingModal.value?.switchIsVisibleLoadingWindow();

  // 最終ページではない場合、インクリメント
  if (pageTag.value !== PAGE_TAG_CONFIRM_PARTNER_DATA) {
    ++pageTag.value;
  }
}

/**
 * 最終ページのボタンクリック時の処理
 */
function btnFinishAction() {
  return navigateTo({
    path: "/home",
  });
}

/**
 * ボタン処理のラップメソッド
 * @param btnType ボタン種別
 */
function btnCommonAction(btnType: BtnType): void {
  switch (btnType) {
    case BtnType.next:
      btnNextAction();
      break;
    case BtnType.back:
      btnBackAction();
      break;
    case BtnType.register:
      btnRegisterAction();
      break;
    case BtnType.finish:
      btnFinishAction();
  }
}

// COMPUTED
const formColumnText = computed(() => {
  if (pageTag.value === PAGE_TAG_COMPLATE_INITIALIZE_DATA) {
    return "COMPLATE";
  }

  if (
    pageTag.value == PAGE_TAG_INPUT_INITIALIZE_DATA ||
    pageTag.value === PAGE_TAG_INPUT_PARTNER_DATA
  ) {
    return "INITIALIZE";
  }

  if (pageTag.value === PAGE_TAG_COMPLATE_PARTNER_DATA) {
    return "LET'S GO !";
  }

  return "CONFIRM";
});

const formHelpText = computed(() => {
  if (pageTag.value === PAGE_TAG_COMPLATE_INITIALIZE_DATA) {
    return "登録に完了しました！";
  }

  if (pageTag.value === PAGE_TAG_INPUT_INITIALIZE_DATA) {
    return "初期設定に必要な項目を入力してください。";
  }

  if (pageTag.value === PAGE_TAG_INPUT_PARTNER_DATA) {
    return "パートナーのユーザーIDを入力してください。";
  }

  if (pageTag.value === PAGE_TAG_CONFIRM_INITIALIZE_DATA) {
    return "項目内容が正しいか確認してください。";
  }

  if (pageTag.value === PAGE_TAG_CONFIRM_PARTNER_DATA) {
    return "項目内容が正しいか確認してください。";
  }

  if (pageTag.value === PAGE_TAG_COMPLATE_PARTNER_DATA) {
    return "それでは、ほわすたをはじめましょう！  ";
  }

  return "error";
});

const buttonNextText = computed(() => {
  if (getBtnNextType.value === BtnType.next) {
    return "次へ";
  }

  if (getBtnNextType.value === BtnType.register) {
    return "登録";
  }

  if (getBtnNextType.value === BtnType.finish) {
    return "ほわすたへようこそ！";
  }
});

const getBtnNextType = computed(() => {
  if (
    pageTag.value === PAGE_TAG_CONFIRM_INITIALIZE_DATA ||
    pageTag.value === PAGE_TAG_CONFIRM_PARTNER_DATA
  ) {
    return BtnType.register;
  }

  if (pageTag.value === PAGE_TAG_COMPLATE_PARTNER_DATA) {
    return BtnType.finish;
  }

  return BtnType.next;
});

const isVisibleBtnBack = computed(() => {
  return (
    pageTag.value === PAGE_TAG_CONFIRM_INITIALIZE_DATA ||
    pageTag.value === PAGE_TAG_CONFIRM_PARTNER_DATA
  );
});

const displayPartnerId = computed(() => {
  if (partnerId.value === "") {
    return "設定なし";
  }
  return partnerId.value;
});

/**
 * フォームボタン活性条件のラッパーメソッド
 * @returns true:非活性 false:活性
 */
const isDisabledFormButton = computed(() => {
  if (pageTag.value === PAGE_TAG_INPUT_INITIALIZE_DATA) {
    return hasValidErrorUserId(userId.value) || hasValidErrorUserName();
  }

  if (pageTag.value == PAGE_TAG_INPUT_PARTNER_DATA) {
    return hasValidErrorUserId(partnerId.value);
  }

  return false;
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
      <div
        v-if="pageTag == PAGE_TAG_INPUT_INITIALIZE_DATA"
        class="flex flex-col gap-y-4"
      >
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
        />

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
        />
      </div>

      <div
        v-else-if="pageTag === PAGE_TAG_CONFIRM_INITIALIZE_DATA"
        class="flex flex-col gap-y-4"
      >
        <label class="text-lg">ユーザーID </label>
        <p class="w-full text-lg p-4 bg-gray-100 text-gray-500">
          {{ userId }}
        </p>
        <label class="text-lg">ユーザー名</label>
        <p class="w-full text-lg p-4 bg-gray-100 text-gray-500">
          {{ userName }}
        </p>
      </div>

      <div v-else-if="pageTag === PAGE_TAG_COMPLATE_INITIALIZE_DATA"></div>

      <div
        v-else-if="pageTag == PAGE_TAG_INPUT_PARTNER_DATA"
        class="flex flex-col gap-y-4"
      >
        <div class="flex flex-col">
          <label class="text-lg">パートナーID </label>
          <p class="text-sm text-red-500">
            ※ 後で設定することもできます。<br />
            また、設定しなくても本アプリは利用できます。
          </p>
        </div>
        <input
          type="text"
          id="userId"
          autocomplete="off"
          placeholder="whatner"
          v-model="partnerId"
          class="w-full outline-none text-lg border p-4"
        />
      </div>

      <div
        v-else-if="pageTag == PAGE_TAG_CONFIRM_PARTNER_DATA"
        class="flex flex-col gap-y-4"
      >
        <label class="text-lg">パートナーID</label>
        <p class="w-full text-lg p-4 bg-gray-100 text-gray-500">
          {{ displayPartnerId }}
        </p>
      </div>

      <div v-else-if="pageTag === PAGE_TAG_COMPLATE_PARTNER_DATA"></div>

      <button
        class="w-full text-lg md:text-2xl text-white h-12 md:h-16 rounded-md font-bold p-2 mt-12 outline-none"
        :class="{
          'bg-blue-300 pointer-events-none': isDisabledFormButton,
          'bg-blue-500': !isDisabledFormButton,
        }"
        @click.prevent="btnCommonAction(getBtnNextType)"
        :disabled="isDisabledFormButton"
      >
        {{ buttonNextText }}
      </button>

      <button
        class="w-full text-lg md:text-2xl h-12 md:h-16 rounded-md font-bold p-2 text-blue-500 border border-blue-500 outline-none"
        @click.prevent="btnCommonAction(BtnType.notRegister)"
        v-if="pageTag === PAGE_TAG_INPUT_PARTNER_DATA"
      >
        登録せず進む
      </button>

      <button
        class="w-full text-lg md:text-2xl h-12 md:h-16 rounded-md font-bold p-2 text-blue-500 border border-blue-500 outline-none"
        @click.prevent="btnCommonAction(BtnType.back)"
        v-if="isVisibleBtnBack"
      >
        戻る
      </button>
    </form>
  </div>
</template>
