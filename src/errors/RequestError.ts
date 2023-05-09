export default class RequestError extends Error {
  cause: {
    code: number;
    message: string;
  };

  constructor(message: string, { cause }) {
    super(message);
    this.cause = cause;
  }
}
