<script setup lang="ts">
// LifeCicle

// values
const message: Ref = ref("");

const HEIGHT_WRAPPER_TEXTAREA = 150;

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

  const text: string = message.value;

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
</script>

<template>
  <div
    class="flex p-8 md:p-12 lg:p-10 lg:justify-center bg-img flex-col gap-x-10 lg:flex-row h-full items-center lg:items-start"
  >
    <div class="w-2/4 flex flex-col items-center border border-gray-200">
      <div
        class="w-full h-[150px] top-0 flex flex-col sticky bg-white border-b border-gray-200 pb-2"
        id="wrapper-textarea"
      >
        <textarea
          v-model="message"
          placeholder="今欲しいものを書き込んでみましょう！"
          class="resize-none w-full h-[100px] outline-none p-4 text-xl overflow-hidden"
          @input="autoResizeTextArea($event)"
        ></textarea>
        <button class="bg-blue-500 w-32 rounded-full p-2 ml-auto mr-2 h-[50px]">
          優先度は？
        </button>
      </div>
      <div class="bg-red-200 w-full p-8 flex flex-col gap-y-8">
        <section class="bg-blue-300 w-full h-[200px] rounded-md"></section>
        <section class="bg-blue-300 w-full h-[200px] rounded-md"></section>
        <section class="bg-blue-300 w-full h-[200px] rounded-md"></section>
        <section class="bg-blue-300 w-full h-[200px] rounded-md"></section>
        <section class="bg-blue-300 w-full h-[200px] rounded-md"></section>
      </div>
    </div>
    <div class="bg-red-100 w-1/4 h-[600px] p-4 sticky top-0">
      <img src="https://placehold.jp/150x150.png" alt="" />
    </div>
  </div>
</template>
