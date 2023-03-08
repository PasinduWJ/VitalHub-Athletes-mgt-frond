import CountryDto from "../CountryDto";
import GenderDto from "../GenderDto";
import EventDto from "../EventDto";

export default class CommonPageDataResponseDto {
  constructor(
    public country:CountryDto[],
    public gender:GenderDto[],
    public event:EventDto[],
  ) {
  }
}
