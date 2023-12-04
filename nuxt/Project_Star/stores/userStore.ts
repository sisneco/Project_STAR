import { defineStore } from "pinia";

// フィールド初期化時の値
const INITIAL_VALUE_UID = "";
const INITIAL_VALUE_USER_ID = "";
const INITIAL_VALUE_USER_NAME = "";
const INITIAL_VALUE_PARTNER_UID = "";

// USE IMPORT VALUES
const nuxtApp = useNuxtApp();
const db: any = nuxtApp.$db;

export const userStore = defineStore("userStore", {
  state: () => ({
    uid: INITIAL_VALUE_UID, // firebase auth Id
    userId: INITIAL_VALUE_UID, // UserID(add user)
    userName: INITIAL_VALUE_USER_NAME, // UserName(add user)
    partnerUid: INITIAL_VALUE_PARTNER_UID, // partner firebase auth ID
  }),
  getters: {
    isSettingStoreValue(): boolean {
      return (
        this.uid !== INITIAL_VALUE_UID && this.uid !== INITIAL_VALUE_USER_ID
      );
    },
  },
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
    async fetchUserInfo(): void {
      const query = db.collection("users").doc(this.uid);

      const fetchResult = query.get(); // firebase.firestore.DocumentSnapshotのインスタンスを取得
      if (fetchResult.exists) {
        const data: any = fetchResult.data();

        this.userId = data.userId;
        this.userName = data.userName;
        this.partnerUid = data.partnerUid;
      }
    },
  },
});
