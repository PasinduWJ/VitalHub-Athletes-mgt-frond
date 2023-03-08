export class CommonResponse<T> {

  constructor(
    public code: number,
    public message: string,
    public content: T
  ) {
  }

}
