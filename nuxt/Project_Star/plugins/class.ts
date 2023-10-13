class Form {
  // FIELD
  key: string = "";
  placeholderText: string = "";
  value: string = "";
  inputType: string = "";

  constructor(key: string, placeholder: string, inputType: string) {
    this.key = key;
    this.placeholderText = placeholder;
    this.inputType = inputType;

    // valueのみ空白で初期化
    this.value = "";
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("form", Form);
});
