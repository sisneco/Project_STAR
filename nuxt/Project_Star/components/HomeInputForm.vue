<script setup lang="ts">
import LoadingModal from "./LoadingModal.vue";
onMounted(() => {
  if (isMaxWidth768()) {
    isModalVisible.value = false;
  }
});

// VALUES
const inputText: Ref<string> = ref("");

const isModalVisible: Ref = ref(true);

// USE IMPORT VALUES
const nuxtApp = useNuxtApp();
const loadingModal = ref<InstanceType<typeof LoadingModal> | null>(null);

// CONST
/** textAreaの自動サイズ調整用の高さ */
let HEIGHT_WRAPPER_TEXTAREA: any = null;

/** INPUT TYPE */
// text
const INPUT_TYPE_TEXT = "text";
// number
const INPUT_TYPE_NUMBER = "number";
// textarea
const INPUT_TYPE_TEXTAREA = "textarea";
// star
const INPUT_TYPE_STAR = "star";

const formArray: Array<Form> = new Array();

// ENUM
enum BtnType {
  next = 0,
  back = 1,
  register = 2,
}

class Form {
  // FIELD
  key: string;
  placeholderText: string;
  value: string;
  inputType: string;
  labelText: string;
  isNecessary: boolean;

  constructor(
    key: string,
    placeholder: string,
    inputType: string,
    labelText: string,
    isNecessary: boolean
  ) {
    this.key = key;
    this.placeholderText = placeholder;
    this.inputType = inputType;
    this.labelText = labelText;
    this.isNecessary = isNecessary;

    // valueのみ空白で初期化
    this.value = "";
  }

  getAddJsonFormat(): object {
    return { [this.key]: this.value };
  }
}

const currentForm: Ref<Form> = ref(
  new Form(
    "wantItem",
    "今欲しいものを書き込んでみましょう！",
    INPUT_TYPE_TEXT,
    "欲しいもの",
    true
  )
);

formArray.push(currentForm.value);
formArray.push(
  new Form(
    "price",
    "値段はどれぐらいになりそうですか？",
    INPUT_TYPE_NUMBER,
    "金額",
    true
  )
);
formArray.push(
  new Form(
    "priority",
    "優先度はどうでしょうか？",
    INPUT_TYPE_STAR,
    "優先度",
    true
  )
);
formArray.push(
  new Form(
    "itemUrl",
    "商品URLがあれば書き込んで！",
    INPUT_TYPE_TEXT,
    "商品URL（任意）",
    false
  )
);
formArray.push(
  new Form(
    "memo",
    "なにか要望などがあれば書いてみましょう！",
    INPUT_TYPE_TEXTAREA,
    "要望など",
    false
  )
);

// METHODS
/**
 * textareaを自動的にリサイズする
 * 改行コードの数と係数を掛けることで値を設定する
 * @param event InputEvent(対象のDOM)
 */
function autoResizeTextArea(event: Event) {
  if (event === null) {
    return;
  }

  // テキストエリアの要素
  const textareaEl: HTMLElement = <HTMLInputElement>event.currentTarget;
  // テキストエリアの親要素
  const wrapperTextareaEl: HTMLElement = <HTMLInputElement>(
    textareaEl.parentElement
  );
  // FORM全体の親要素
  const wrapperFormEl: HTMLElement = <HTMLInputElement>(
    wrapperTextareaEl.parentElement
  );

  const text: string = inputText.value;

  // 1つ目の改行はカウントしない
  let cnt: number = countParamNewLine(text);

  // 基準値が設定されていない場合 -> 設定
  if (HEIGHT_WRAPPER_TEXTAREA === null) {
    HEIGHT_WRAPPER_TEXTAREA = wrapperTextareaEl.clientHeight;
  }

  textareaEl.style.height = (HEIGHT_WRAPPER_TEXTAREA * 1) / 2 + cnt * 25 + "px";
  wrapperTextareaEl.style.height = HEIGHT_WRAPPER_TEXTAREA + cnt * 25 + "px";
}

/**
 * 引数の改行の数を返却する
 * @param target 改行の数を検索する文字列
 */
function countParamNewLine(target: string): number {
  // nullチェック
  if (target === null || target === undefined) {
    return 0;
  }

  // 正規表現（改行）
  const regExp: RegExp = new RegExp("[/\n/g]", "gm");

  // 一致しない場合 -> 0
  if (target.match(regExp) === null) {
    return 0;
  }

  // 冗長的な書き方であるが、長さを取得できなかった場合 -> 0
  const cnt: any = target.match(regExp)?.length;
  return cnt === undefined ? 0 : cnt;
}

/**
 * 次へ or 登録押下時のボタン処理
 */
function btnNextAction() {
  // ボタンが非活性の場合は処理を実行しない
  if (isDisabledBtnNext.value) {
    console.log(isDisabledBtnNext.value);
    return;
  }

  // 現在のkeyの添字を取得
  let index: number = nowFormArrayIndex.value;
  // 入力値を保存
  formArray[index].value = inputText.value;
  index += 1;

  // 項目を更新(上記処理により、該当するフォームの値に紐づいて更新)
  currentForm.value = formArray[index];
  inputText.value = currentForm.value.value;

  // フォーカスを当てる
  autoInputFocus();

  // 個別処理[星]のパラメータが設定されている場合 -> 初期設定をする
  if (
    currentForm.value.inputType === INPUT_TYPE_STAR &&
    currentForm.value.value !== ""
  ) {
    nextTick(() => {
      clickRatingStar(Number.parseInt(currentForm.value.value));
    });
  }
}

/**
 * 戻るボタン押下時のボタン処理
 */
function btnBackAction() {
  // 現在のkeyの添字を取得
  let index: number = nowFormArrayIndex.value;

  // 添字が0ならば処理を終了
  if (index === 0) {
    return;
  }

  // 入力値を保存
  formArray[index].value = inputText.value;
  index -= 1;

  // 項目を更新(上記処理により、該当するフォームの値に紐づいて更新)
  currentForm.value = formArray[index];
  inputText.value = currentForm.value.value;

  // フォーカスを当てる
  autoInputFocus();

  // 個別処理[星]のパラメータが設定されている場合 -> 初期設定をする
  if (
    currentForm.value.inputType === INPUT_TYPE_STAR &&
    currentForm.value.value !== ""
  ) {
    nextTick(() => {
      clickRatingStar(Number.parseInt(currentForm.value.value));
    });
  }
}

/**
 * ボタン共通のラッパークラス
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
  }
}

/**
 * フォーム（モーダル）を開く時の処理
 */
function btnOpenModalAction() {
  // 共通処理(モーダル)
  btnCommonModalAction();

  // フォーカスを当てる
  autoInputFocus();
}

/**
 * 登録ボタンクリック時の処理
 */
async function btnRegisterAction() {
  const db: any = nuxtApp.$db;

  interface addJsonParameterFormat {
    [key: string]: string;
  }

  const addJsonParameter: addJsonParameterFormat = {};

  for (let i: number = 0; i < formArray.length; i++) {
    addJsonParameter[formArray[i].key] = formArray[i].value;
  }

  addJsonParameter.uid = userStore().uid;

  // 登録処理（ローディングモーダルで制御）
  loadingModal.value?.switchIsVisibleLoadingWindow();
  db.addJsonParameter = await db.collection("items").add(addJsonParameter);
  loadingModal.value?.switchIsVisibleLoadingWindow();

  resetFormStatus();
}

/**
 * フォームの状態を元に戻す
 */
function resetFormStatus(): void {
  formArray.forEach((val) => (val.value = ""));
  currentForm.value = formArray[0];

  inputText.value = currentForm.value.value;
}

/**
 * モーダル共通処理
 */
function btnCommonModalAction() {
  isModalVisible.value = !isModalVisible.value;
}

/**
 *  非同期処理を利用して、フォーカスを当てる
 */
function autoInputFocus() {
  nextTick(() => {
    document.getElementById(currentForm.value.inputType)?.focus();
  });
}

/**
 * 優先度（星）の星アイコンクリック時にCSSクラスを追加する
 * @param n 星の数
 */
function clickRatingStar(n: number) {
  for (let i = 0; i <= 5; i++) {
    const color: string = i <= n ? "yellow" : "gray";

    const el: HTMLElement | null = document.getElementById("rate" + i);

    if (el !== null) {
      el.style.color = color;
    }

    inputText.value = String.toString(n);
  }
}

// COMPUTED

const nowFormArrayIndex = computed(() => {
  return formArray.findIndex((v) => v.key === currentForm.value.key);
});

const getBtnNextType = computed(() => {
  return nowFormArrayIndex.value === formArray.length - 1
    ? BtnType.register
    : BtnType.next;
});

const btnNextName = computed(() => {
  return getBtnNextType.value === BtnType.register ? "登録" : "次へ";
});

const isDisabledBtnNext = computed(() => {
  return inputText.value === "" && currentForm.value.isNecessary;
});
</script>

<template>
  <LoadingModal ref="loadingModal" />

  <div
    class="fixed w-screen h-screen flex flex-col-reverse top-0 bg-white border-b border-gray-200 p-4 gap-y-4 lg:w-full lg:h-[150px] lg:flex-col lg:sticky"
    id="wrapper-textarea"
    :class="{ hidden: !isModalVisible }"
  >
    <div
      class="w-full h-1/2 py-2 flex justify-end gap-x-2 pr-4 text-white font-bold font-sans border-b pb-4 items-end lg:items-center lg:py-0"
    >
      <div class="mr-auto flex text-gray-500 items-center">
        <span class="hidden md:block">項目：</span>
        <label class="text-sm md:text-lg pb-2 md:pb-0">{{
          currentForm.labelText
        }}</label>
        <p class="text-sm md:text-base pl-2 pb-2 md:pb-0">
          {{ nowFormArrayIndex + 1 }} /{{ formArray.length }}
        </p>
      </div>
      <button
        class="w-24 md:w-32 p-2 rounded-full text-blue-500 font-bold font-sans border border-blue-500"
        @click="btnBackAction()"
        v-if="nowFormArrayIndex !== 0"
      >
        戻る
      </button>
      <button
        class="w-24 md:w-32 rounded-full p-2 text-white font-bold font-sans"
        @click="btnCommonAction(getBtnNextType)"
        :class="{
          'bg-blue-300 pointer-events-none': isDisabledBtnNext,
          'bg-blue-500': !isDisabledBtnNext,
        }"
      >
        {{ btnNextName }}
      </button>
    </div>

    <div
      class="w-full h-1/2 flex flex-col gap-y-4 items-start lg:justify-center"
      @keydown.ctrl.enter="btnCommonAction(getBtnNextType)"
      @keydown.shift.enter="btnCommonAction(BtnType.back)"
    >
      <span
        class="lg:hidden hover:"
        :class="{ hidden: !isModalVisible }"
        @click="btnCommonModalAction()"
        >✗</span
      >
      <textarea
        v-model="inputText"
        :placeholder="currentForm.placeholderText"
        class="w-full resize-none outline-none text-xl overflow-hidden"
        id="textarea"
        @input="autoResizeTextArea($event)"
        v-if="currentForm.inputType === INPUT_TYPE_TEXTAREA"
      ></textarea>
      <input
        v-model="inputText"
        type="number"
        id="number"
        :placeholder="currentForm.placeholderText"
        onkeydown="return event.keyCode !== 69"
        class="w-full resize-none outline-none text-xl overflow-hidden"
        v-else-if="currentForm.inputType === INPUT_TYPE_NUMBER"
      />
      <input
        v-model="inputText"
        type="text"
        id="text"
        :placeholder="currentForm.placeholderText"
        autocomplete="off"
        class="w-full outline-none text-xl"
        v-else-if="currentForm.inputType === INPUT_TYPE_TEXT"
      />
      <div
        id="star"
        class="flex flex-col h-full"
        v-else-if="currentForm.inputType === INPUT_TYPE_STAR"
      >
        <div class="flex items-center z-10 w-fit">
          <span
            v-for="n in 5"
            :id="'rate' + n"
            @click="clickRatingStar(n)"
            class="text-gray-400 text-4xl cursor-pointer"
            >★</span
          >
        </div>
      </div>
    </div>
  </div>

  <div
    class="h-16 w-16 bg-orange-200 rounded-full fixed bottom-4 right-4 lg:hidden flex justify-center items-center hover:cursor-pointer"
    @click="btnOpenModalAction()"
    :class="{ hidden: isModalVisible }"
  >
    <img src="@/assets/img/memo.png" alt="" />
  </div>
</template>
