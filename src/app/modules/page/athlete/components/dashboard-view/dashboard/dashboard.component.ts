import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import GenderDto from "../../../../../share/dto/GenderDto";
import CountryDto from "../../../../../share/dto/CountryDto";
import EventDto from "../../../../../share/dto/EventDto";
import AthleteView from "../../../../../share/dto/AthleteView";
import {AthleteService} from "../../../../../share/service/athlete.service";
import AthleteResponseDto from "../../../../../share/dto/response/AthleteResponseDto";
import {SnackBarService} from "../../../../../share/core/snack-bar/snack-bar.service";
import {AthleteAllResponse} from "../../../../../share/dto/response/AthleteAllResponse";
import {CommonResponse} from "../../../../../share/dto/response/CommonResponse";
import CommonPageDataResponseDto from "../../../../../share/dto/response/CommonPageDataResponseDto";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public athleteDetails: AthleteView[] = [];

  genderList: GenderDto[] = [];
  countryList: CountryDto[] = [];
  eventList: EventDto[] = [];

  constructor(private athleteService: AthleteService,
              private snackbarService: SnackBarService) {
  }

  searchForm = new FormGroup({
    name: new FormControl(''),
    country: new FormControl(''),
    gender: new FormControl(''),
    event: new FormControl(''),
  });

  ngOnInit() {
    this.athleteService.getAllCommonData().subscribe(res => {
      let responce: CommonResponse<CommonPageDataResponseDto> = res as CommonResponse<CommonPageDataResponseDto>;
      if (responce.code === 200) {
        this.commonDataSet(responce.content);
        this.searchAthlete();
      } else {
        this.snackbarService.showSnackbar(responce.message, 'Close');
      }
    }, error => {
      this.snackbarService.showSnackbar('Something went wrong', 'Close');
    });
  }

  commonDataSet(loadData: CommonPageDataResponseDto) {
    loadData.country.forEach(value => this.countryList.push(new CountryDto(value.id, value.country)));
    loadData.gender.forEach(value => this.genderList.push(new GenderDto(value.id, value.gender)));
    loadData.event.forEach(value => this.eventList.push(new EventDto(value.id, value.event)));
  }

  searchAthlete() {
    this.athleteService.getSearchAthlete(
      this.searchForm.get('name')?.value! ?? '',
      this.searchForm.get('country')?.value! ?? '',
      this.searchForm.get('gender')?.value! ?? '',
      this.searchForm.get('event')?.value! ?? ''
    ).subscribe(res => {
      let response: AthleteAllResponse = res as AthleteAllResponse;
      if (response.code === 200) {
        let responseData: AthleteResponseDto[] = response.content;
        this.populateAthletes(responseData);
      } else {
        if (response.code === 404) {
          this.athleteDetails = [];
        }
        this.snackbarService.showSnackbar(response.message, 'Close');
      }
    }, error => {
      this.snackbarService.showSnackbar('Something went wrong', 'Close');
    });
  }

  populateAthletes(responseData: AthleteResponseDto[]) {
    this.athleteDetails = [];
    responseData.forEach(value => {
      let athlete: AthleteView = new AthleteView();
      athlete.firstName = value.firstName;
      athlete.lastName = value.lastName;
      athlete.country = this.countryList.filter(val => val.id == value.countryId)[0].country;
      athlete.gender = this.genderList.filter(val => val.id == value.genderId)[0].gender;
      athlete.birthyear = (new Date().getFullYear() - new Date(value.dob).getFullYear()).toString();
      if (value.profileImage.imageData != null && value.profileImage.imageData != '') {
        athlete.image = 'data:image/jpeg;base64,' + value.profileImage.imageData;
      }
      value.athleteEvents.forEach(val => {
        let event = this.eventList.filter(item => item.id == val.eventId)[0].event;
        let result = (val.result != null && val.result != '') ? val.result : '';
        athlete.eventList.push({eventId: event, result: result});
      })
      value.athleteEvents.forEach
      this.athleteDetails.push(athlete);
    });
  }

  clearSearch() {
    this.searchForm.reset();
    this.searchAthlete();
  }

}
