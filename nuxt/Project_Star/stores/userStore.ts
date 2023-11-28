import { defineStore } from "pinia";

// フィールド初期化時の値
const INITIAL_VALUE_UID = "";
const INITIAL_VALUE_USER_ID = "";
const INITIAL_VALUE_PARTNER_UID = "";

export const userStore = defineStore("userStore", {
  state: () => ({
    uid: INITIAL_VALUE_UID, // firebase auth Id
    userId: "", // UserID(add user)
    partnerUid: "", // partner firebase auth ID
  }),
  getters: {},
  actions: {
    setUid(uid: string): void {
      this.uid = uid;
    },
    /**
     *　storeを初期化する
     */
    initialStore(): void {
      this.uid = INITIAL_VALUE_UID;
      this.userId = INITIAL_VALUE_USER_ID;
      this.partnerUid = INITIAL_VALUE_PARTNER_UID;
    },
    isSettingStoreValue(): boolean {
      return this.uid !== INITIAL_VALUE_UID;
    },
  },
});
