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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public athleteDetails: AthleteView[] = [];

  genderList: GenderDto[] = [
    {id: '1', gender: 'm'},
    {id: '2', gender: 'f'},
  ];

  countryList: CountryDto[] = [
    {id: '1', country: 'SL'},
    {id: '2', country: 'UK'},
    {id: '3', country: 'AS'},
  ];
  eventList: EventDto[] = [
    {id: '1', event: '100m'},
    {id: '2', event: '200m'},
    {id: '3', event: '400m'},
  ];


  constructor(private athleteService: AthleteService,
              private snackbarService: SnackBarService) {
  }

  searchForm = new FormGroup({
    name: new FormControl(''),
    country: new FormControl(''),
    gender: new FormControl(''),
    event: new FormControl(''),
  });

  ngOnInit(): void {
    this.loadAthletes();

  }

  loadAthletes() {
    this.athleteService.getAllAthlete().subscribe(res => {
      let response: AthleteAllResponse = res as AthleteAllResponse;
      if (response.code === 200) {
        let responseData: AthleteResponseDto[] = response.content;
        this.populateAthletes(responseData);
      } else {
        this.snackbarService.showSnackbar(response.message, 'Close');
      }
    }, error => {
      this.snackbarService.showSnackbar('Something went wrong', 'Close');
    });
  }

  searchAthlete() {
    let name = '';
    let country = '';
    let gender = '';
    let event = '';


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
        if(response.code === 404){
          this.athleteDetails=[];
        }
        this.snackbarService.showSnackbar(response.message, 'Close');
      }
    }, error => {
      this.snackbarService.showSnackbar('Something went wrong', 'Close');
    });
  }


  populateAthletes(responseData: AthleteResponseDto[]) {
    this.athleteDetails=[];
    responseData.forEach(value => {
      let athlete: AthleteView = new AthleteView();
      athlete.firstName = value.firstName;
      athlete.lastName = value.lastName;
      athlete.country = this.countryList.filter(val => val.id == value.countryId)[0].country;
      athlete.gender = this.genderList.filter(val => val.id == value.genderId)[0].gender;
      athlete.birthyear = (new Date().getFullYear() - new Date(value.dob).getFullYear()).toString();
      athlete.image = 'data:image/jpeg;base64,' + value.profileImage.imageData;
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
    this.loadAthletes();
  }
}
