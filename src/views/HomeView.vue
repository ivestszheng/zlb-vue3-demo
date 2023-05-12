<template>
  <div class="home">
    <div class="block">
      <p>
        <b>useContainerEnv</b>
        支持判断<b>浙里办App</b>、<b>支付宝小程序</b>、<b>支付宝小程序</b>、<b
          >支付宝 App</b
        >、<b>微信</b>
      </p>
      <button @click="getMyContainerEnv">获取容器环境:{{ env }}</button>
    </div>
    <div class="block">
      <p>
        <b>useMobile</b> 中的
        <b>getSystemType</b>
        可以用来判断手机系统，由于我是的移动端使用，没有增加判断 PC 的相关逻辑
      </p>
      <button @click="getMyMobileSystem">获取手机系统</button>
    </div>
    <div class="block">
      <p>
        在 http 中封装了 axios 与 mgop，当 NODE_ENV 为 production 时使用
        mgop，否则使用 axios，调用后请查看“网络”。
      </p>
      <p>项目执行生产环境 npx vue-cli-service serve --mode production</p>
      <p>
        在IRS上的测试环境与线上环境发送请求时需要修改 env 中的
        VUE_APP_ZLB_APP_KEY
      </p>
      <p>
        由于后端响应失败时，浙里办会抛出自己的异常信息，导致无法拿到后端抛出的异常信息。所以与后端约定返回的数据结构永远包含
        data,code,messge 三个字段，http 状态码永远为
        200，真实的响应状态与信息通过响应体中的 code 与 message 来判断。
      </p>
      <p>
        在 mgop 的回调中，也是针对这一结构做了特殊处理。如果对 mgop
        还不熟悉，刚刚开始联调，可以修改 ts 中的 RequestResponse 结构与修改 mgop
        中的处理逻辑，直接 resolve 需要的数据。
      </p>
      <button @click="testGet(1)">发送GET请求</button>
      <button @click="testPost({ hellow: 123 })">发送POST请求</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import useContainerEnv from "@/composables/useContainerEnv";
import useMobile from "@/composables/useMobile";
import { testPost, testGet } from "@/apis/test";
// import useCostomApis from "@/http/useCostomApis";

const { env, getContainerEnv } = useContainerEnv(),
  { getSystemType } = useMobile();
function getMyContainerEnv() {
  try {
    /**
     * 在某些场景下可能会需要取消所有其他接口的能力，使用自定义的 cancel 虽然不能“真的”去取消已发送的请求,
     * 但是在回调时会判断是否需要响应，调用 cancel 后，接口响应时抛出自定义的超时异常。
     */
    // const { cancel } = useCostomApis()
    // cancel();
    const data = getContainerEnv();
    alert(`获取容器环境：${data}`);
  } catch (e) {
    console.error(e);
  }
}

function getMyMobileSystem() {
  try {
    const data = getSystemType();
    alert(`获取手机系统${data}`);
  } catch (e) {
    console.error(e);
  }
}
</script>

<style scoped></style>
