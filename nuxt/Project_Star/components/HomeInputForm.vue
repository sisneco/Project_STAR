<script setup lang="ts">
// values
const inputText: Ref = ref("");
const btnText: Ref = ref("次へ");

const HEIGHT_WRAPPER_TEXTAREA = 150;

const formArray: Array<Form> = new Array();

class Form {
  key: string;
  placeholderText: string;
  value: string;

  constructor(key: string, placeholder: string) {
    this.key = key;
    this.placeholderText = placeholder;

    // valueのみ空白で初期化
    this.value = "";
  }
}

const currentForm: Ref<Form> = ref(
  new Form("wantItem", "今欲しいものを書き込んでみましょう！")
);

formArray.push(currentForm.value);
formArray.push(new Form("price", "値段はどれぐらいになりそうですか？"));
formArray.push(new Form("priority", "優先度はどうでしょうか？"));
formArray.push(new Form("memo", "なにか要望などがあれば書いてみましょう！"));

// methods
/**
 * textareaを自動的にリサイズする
 * 改行コードの数と係数を掛けることで値を設定する
 * @param event InputEvent(対象のDOM)
 */
function autoResizeTextArea(event: Event) {
  if (event === null) {
    return;
  }

  const textareaEl: HTMLElement = <HTMLInputElement>event.currentTarget;
  const wrapperTextareaEl: HTMLElement = <HTMLInputElement>(
    textareaEl.parentElement
  );

  const text: string = inputText.value;

  let cnt: number = countParamNewLine(text);

  if (cnt === 1) {
    cnt = 0;
  }

  textareaEl.style.height = (HEIGHT_WRAPPER_TEXTAREA * 2) / 3 + cnt * 25 + "px";
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
  btnCommonAction(true);
}

/**
 * 戻るボタン押下時のボタン処理
 */
function btnBackAction() {
  btnCommonAction(false);
}

/**
 * ボタン共通処理
 * @param isNext true 次へボタン false 戻るボタン
 */
function btnCommonAction(isNext: boolean) {
  // 現在のkeyの添字を取得
  let index: number = nowFormArrayIndex.value;
  // 入力値を保存
  formArray[index].value = inputText.value;

  // 次へボタンの場合 -> インクリメント , 戻るボタンの場合 -> デクリメント
  index = isNext ? ++index : --index;

  // 項目を更新(上記処理により、該当するフォームの値に紐づいて更新)
  currentForm.value = formArray[index];
  inputText.value = currentForm.value.value;

  // ボタンテキストを更新
  btnText.value = index === formArray.length - 1 ? "登録" : "次へ";
}

// computed
const isShowBtnBack = computed(() => {
  /** 添字(一番初め) */
  const FIRST_INDEX: number = 0;

  return (
    formArray.findIndex((v) => v.key === currentForm.value.key) !== FIRST_INDEX
  );
});

const nowFormArrayIndex = computed(() => {
  return formArray.findIndex((v) => v.key === currentForm.value.key);
});
</script>

<template>
  <div
    class="hidden w-full h-[150px] top-0 lg:flex flex-col sticky bg-white border-b border-gray-200 pb-2"
    id="wrapper-textarea"
  >
    <textarea
      v-model="inputText"
      :placeholder="currentForm.placeholderText"
      class="resize-none w-full h-[100px] outline-none p-4 text-xl overflow-hidden"
      @input="autoResizeTextArea($event)"
    ></textarea>
    <div
      class="w-full rounded-full h-[45px] flex justify-end gap-x-2 pr-4 text-white font-bold font-sans"
    >
      <button
        class="w-32 rounded-full p-2 h-full text-gray-600 font-bold font-sans border border-gray-600"
        @click="btnBackAction()"
        v-if="isShowBtnBack"
      >
        戻る
      </button>
      <button
        class="bg-blue-500 w-32 rounded-full p-2 h-full text-white font-bold font-sans"
        @click="btnNextAction()"
      >
        {{ btnText }}
      </button>
    </div>
  </div>

  <img
    src="@/assets/img/testIcon.jpg"
    alt=""
    class="h-20 rounded-full fixed bottom-2 right-2"
  />
</template>
