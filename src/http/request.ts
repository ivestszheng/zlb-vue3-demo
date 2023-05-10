import mgop from "./mgop";
import axiosInstance from "./axiosInstance";

function request(
  apis: { dev: string; prod?: string },
  type = "GET",
  config?: { data?: any }
): Promise<RequestResponse> {
  if (process.env.NODE_ENV !== "production" && type.toLowerCase() === "get") {
    return axiosInstance.get(apis.dev, {
      params: config && config.data !== undefined ? config.data : null,
      ...config,
    });
  } else if (
    process.env.NODE_ENV !== "production" &&
    type.toLowerCase() === "post"
  ) {
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
