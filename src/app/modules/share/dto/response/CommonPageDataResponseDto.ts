import CountryDto from "../CountryDto";
import GenderDto from "../GenderDto";
import EventDto from "../EventDto";

export default class AthleteResponseDto {
  constructor(
    public country:CountryDto[],
    public gender:GenderDto[],
    public event:EventDto[],
  ) {
  }
}
