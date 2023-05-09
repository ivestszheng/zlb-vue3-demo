import axios from "axios";
import { useUserStore } from "@/stores/user";
import RequestError from "@/errors/RequestError";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000,
});

service.interceptors.request.use(
  (config: any) => {
    const userStore = useUserStore();
    if (userStore.token)
      config.headers.Authorization = `Bearer ${userStore.token}`;
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const { data } = response;
    const code = parseInt(data?.code);
    const message = data?.message || "无详情";

    if (code !== 200) {
      const error = new RequestError(
        `服务器内部错误,状态码：${code},${message}`,
        {
          cause: { code, message, api: response.config.url },
        }
      );
      return Promise.reject(error);
    }
    return data;
  },
  (error) => {
    console.error(`err${error}`);

    return Promise.reject(error);
  }
);

export default service;
