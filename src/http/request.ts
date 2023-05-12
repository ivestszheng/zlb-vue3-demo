import mgop from "./mgop";
import axiosInstance from "./axiosInstance";

/**
 * 自定义的请求函数，用来拉平开发环境与浙里办的开发体验，开发环境使用 axios，线上与测试环境使用 mgop 。
 * 由于后端响应失败时，浙里办会抛出自己的异常信息，导致无法拿到后端抛出的异常信息。所以与后端约定返回的数据结构永远包含
 * data,code,messge 三个字段，http 状态码永远为 200，真实的响应状态与信息通过响应体中的 code 与 message 来判断。
 * @param apis api 请求地址 dev 代表通过 axios 请求的路径，prod 代表通过 Mgop 请求的路径。
 * @param type 请求类型 get 或 post 。
 * @param config 配置项，会解构为 mgop 与 axios 的参数，主要用来添加请求体 data 。
 */
function request(
  apis: { dev: string; prod?: string },
  type: "get" | "post",
  config?: { data?: Record<string, any> }
): Promise<RequestResponse> {
  if (process.env.NODE_ENV !== "production" && type === "get") {
    return axiosInstance.get(apis.dev, {
      params: config && config.data !== undefined ? config.data : null,
      ...config,
    });
  } else if (process.env.NODE_ENV !== "production" && type === "post") {
    return axiosInstance.post(
      apis.dev,
      config && config.data !== undefined ? config.data : null,
      { ...config }
    );
  } else {
    return mgop(apis.prod, type, config);
  }
}

export default request;
