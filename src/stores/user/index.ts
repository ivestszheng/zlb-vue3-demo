/*
 * @Descripttion:
 */
import { defineStore } from "pinia";
import { SSOStatus, LogStatus, UiStyle } from "@/ts/enums/single-sign-on.enums";
import { ContainerEnv } from "@/ts/enums/single-sign-on.enums";

/**
 * 用户信息
 * @param zlbToken - 浙里办token，仅用来换取用户个人信息
 * @param token - 青科汇token，请求时携带该token
 */
export const useUserStore = defineStore("user", {
  persist: false,
  // 推荐使用 完整类型推断的箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断其类型
      userid: process.env.NODE_ENV === "production" ? "" : "xxxxx", // 用户唯一标识，如果是开发环境使用后面伪造的数据
      username: "",
      mobile: "",
      uiStyle: UiStyle.NormalMode,
      ticketId: "" as string | undefined, // 浙里办票据
      zlbToken: "",
      token: "",
      env: "" as ContainerEnv,
      status: SSOStatus.Unlogged as SSOStatus,
      idnum: "", // 身份证编号
    };
  },
  getters: {
    isElderlyOrientedMode: (state) =>
      state.uiStyle === "elder" ? true : false,
    /** 如果拿到了用户唯一标识就可认为已经单点成功，这个字段主要在埋点中使用 */
    logStatus: (state) =>
      state.userid ? LogStatus.Logged : LogStatus.Unlogged,
    isQkhOwnTokenExisted: (state) => (state.token ? true : false),
  },
});
