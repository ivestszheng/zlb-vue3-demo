type RequestResponse = {
  code: number;
  data: any;
  message: string;
};

interface IPaginationResponse {
  total: number;
  page: number;
  size: number;
}
