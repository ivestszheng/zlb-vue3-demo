import { mgop } from "@aligov/jssdk-mgop";
import useHandleData from "@/composables/useHandleData";
import useCostomApis from "./useCostomApis";
import { useUserStore } from "@/stores/user/index";
import RequestError from "@/errors/RequestError";

const { getUuid } = useHandleData();
const { add, remove, getIndex } = useCostomApis();

function useMgop(api, type = "GET", config): Promise<RequestResponse> {
  const userStore = useUserStore();
  // api是在开发者平台中注册的rpc的api名称，一个接口一个
  return new Promise((resolve, reject) => {
    // 生成 uuid 并将其加入队列
    const uuid = getUuid();
    add(uuid);
    const mgopReceiceObj = {
      api,
      host: "https://mapi.zjzwfw.gov.cn/",
      dataType: "JSON",
      type,
      appKey: process.env.VUE_APP_ZLB_APP_KEY,
      /** 同事说的，请求头用引号，否则可能会遇上浙里办转换策略的问题 */
      header: {
        Authorization: userStore.token ? `Bearer ${userStore.token}` : "",
      },
      onSuccess: async (res) => {
        if (!checkIsInQueue(uuid)) {
          return reject(handleOnCanceled(api));
        }
        try {
          const result = await handleOnSuccess(res, { api });
          return resolve(result);
        } catch (error) {
          return reject(error);
        }
      },
      onFail: async (error) => {
        if (!checkIsInQueue(uuid)) {
          return reject(handleOnCanceled(api));
        }
        try {
          await handleOnFailed(error, { api });
        } catch (error) {
          reject(error);
        }
      },
      ...config,
    };

    /** 当请求头 isTestUrl 为 "1" 时，使用联调环境，传其他值例如""，"0" 仍然会使用联调环境" */
    if (process.env.VUE_APP_ZLB_IS_ONLINE_ENV === "false")
      mgopReceiceObj.header["isTestUrl"] = "1";
    mgop(mgopReceiceObj);
  });
}

/**
 * 判断是否在需要执行的集合中，这个函数有个副作用，在判断后会该请求从数组中移除，防止数组长度过大。
 **/
function checkIsInQueue(uuid) {
  const index = getIndex(uuid);

  if (index > -1) {
    remove(index);
    return true;
  } else {
    return false;
  }
}

/**
 * 成功响应拦截器：
 * 1. 这里的逻辑处理是对接口返回的数据结构有要求，所有后端返回的 code 不为 200 的情况都会被处理成异常，
 * 这么做的原因是如何接口直接 500,客户端无法捕获到服务器返回的异常，只能捕获到浙里办返出的异常。
 * 2. 在之前的版本中还对 res.ret[0] 是否为 "1000::调用成功"进行判断，之所以去掉是因为 ret[0] 的返回完全由浙里办决定，
 * 对于开发者来说，成功响应拦截器中只想关心服务端返回的数据，res.ret[0] 为其他值的情况基本不会命中，
 * 而一旦命中代表线上出现重大 bug，所有的请求都无法被正常响应，风险太大。
 **/
function handleOnSuccess(res, { api }): Promise<RequestResponse> {
  return new Promise((resolve, reject) => {
    const code = parseInt(res.data?.code);
    const message = res.data?.message || "无详情";

    /** 代表了业务异常的情况，根据项目具体需要做处理 */
    if (code !== 200) {
      const error = new RequestError(`${api},状态码：${code},${message}`, {
        cause: { code, message, api },
      });
      return reject(error);
    } else {
      resolve(res.data);
    }
  });
}

/**
 * 失败响应拦截器：
 * 这个拦截器返回的 Promise 永远是 reject，并且对返回的异常结构做了处理。
 * 手动处理成统一的结构后（包括成功响应拦截器中的业务异常）的原因是
 * mgop 在不同终端返回的结构不同，造成了开发时的心智负担。
 */
function handleOnFailed(error, { api }) {
  return new Promise((resolve, reject) => {
    if (error.errorMessage && error.errorCode) {
      const { errorCode: code, errorMessage: message } = error,
        myError = new RequestError(`${api},状态码：${code},${message}`, {
          cause: { code, message, api },
        });
      return reject(myError);
    } else if (error.ret[0]) {
      const message = error.ret[0],
        code = parseInt(error.ret[0]),
        myError = new RequestError(`${api},状态码：${code},${message}`, {
          cause: { code, message, api },
        });
      return reject(myError);
    } else {
      const message = "未知系统异常",
        code = 500;
      return reject(
        new RequestError(`${api},状态码：${code},${message}`, {
          cause: { code, message, api },
        })
      );
    }
  });
}

/**
 * 通过自定义的能力实现取消请求后的返回
 */
function handleOnCanceled(api: string): RequestError {
  const message = "请求已被取消",
    code = 400;

  return new RequestError(`${api},状态码：${code},${message}`, {
    cause: { code, message, api },
  });
}

export default useMgop;
