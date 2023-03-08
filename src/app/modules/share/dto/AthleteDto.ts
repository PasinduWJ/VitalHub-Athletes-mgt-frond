import ImageDto from "./ImageDto";

export default class AthleteDto {
  constructor(
    public firstName: string,
    public lastName: string,
    public countryId: string,
    public genderId: string,
    public dob: string,
    public profileImage: ImageDto,
    public eventIdList: string[]
  ) {
  }
}
