export default class CustomError extends Error {
  constructor(
    public status: number,
    private _code: string,
    message: string,
  ) {
    super(message);
  }
}
