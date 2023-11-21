import { defineStore } from "pinia";

export const adminStore = defineStore("userStore", {
  state: () => ({
    uid: "", // firebase auth Id
    userId: "", // UserID(add user)
    partnerUid: "", // partner firebase auth ID
  }),
  getters: {},
  actions: {
    setUid(uid) {
      this.uid = uid;
    },
  },
});
