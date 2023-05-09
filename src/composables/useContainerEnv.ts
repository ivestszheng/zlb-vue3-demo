/*
 * @Descripttion: 获取容器环境
 */
import { ref, Ref } from "vue";
import { ContainerEnv } from "@/ts/enums/single-sign-on.enums";

const env: Ref<ContainerEnv> = ref(ContainerEnv.Unknown);

export default function useContainerEnv() {
  function getContainerEnv() {
    const sUserAgent = window.navigator.userAgent.toLowerCase();

    if (sUserAgent.indexOf("dtdreamweb") > -1) {
      env.value = ContainerEnv.ZwApp;
    } else if (
      sUserAgent.indexOf("miniprogram") > -1 &&
      sUserAgent.indexOf("alipay") > -1
    ) {
      env.value = ContainerEnv.AlipayMiniProgram;
    } else if (
      sUserAgent.indexOf("miniprogram") === -1 &&
      sUserAgent.indexOf("alipay") > -1
    ) {
      env.value = ContainerEnv.AlipayApp;
    } else if (
      sUserAgent.indexOf("miniprogram") > -1 &&
      (sUserAgent.indexOf("wx") > -1 || sUserAgent.indexOf("wechat") > -1)
    ) {
      env.value = ContainerEnv.Wechat;
    }
    console.info("获取容器环境", env.value);

    return env.value;
  }

  return {
    env,
    getContainerEnv,
  };
}
