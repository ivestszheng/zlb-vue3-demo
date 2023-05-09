import request from "@/http/request";

const testGet = (id: number): Promise<RequestResponse> => {
  return request(
    {
      dev: "/test/testGet",
      prod: "mgop.tykj.xxx.testTestGet",
    },
    "get",
    { data: { id } }
  );
};

const testPost = (data: any) => {
  return request(
    {
      dev: "/test/testPost",
      prod: "mgop.tykj.xxx.testPost",
    },
    "post",
    {
      data,
    }
  );
};

export { testGet, testPost };
