import ImageDto from "../ImageDto";

export default class AthleteResponseDto {
  constructor(
    public athleteId: string,
    public firstName: string,
    public lastName: string,
    public countryId: string,
    public genderId: string,
    public dob: string,
    public profileImage: ImageDto,
    public athleteEvents: { eventId: string, result: string | null }[]
  ) {
  }
}
