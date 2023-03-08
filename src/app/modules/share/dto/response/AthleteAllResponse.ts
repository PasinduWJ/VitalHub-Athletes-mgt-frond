import AthleteResponseDto from "./AthleteResponseDto";

export class AthleteAllResponse {

  constructor(
    public code: number,
    public message: string,
    public content: AthleteResponseDto[]
  ) {
  }

}
