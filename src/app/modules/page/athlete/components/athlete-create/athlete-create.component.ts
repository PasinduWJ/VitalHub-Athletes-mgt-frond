import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SnackBarService} from "../../../../share/core/snack-bar/snack-bar.service";
import EventDto from "../../../../share/dto/EventDto";
import GenderDto from "../../../../share/dto/GenderDto";
import CountryDto from "../../../../share/dto/CountryDto";
import AthleteDto from "../../../../share/dto/AthleteDto";
import ImageDto from "../../../../share/dto/ImageDto";
import {AthleteService} from "../../../../share/service/athlete.service";
import {CommonResponse} from "../../../../share/dto/response/CommonResponse";
import AthleteResponseDto from "../../../../share/dto/response/CommonPageDataResponseDto";

@Component({
  selector: 'app-athlete-create',
  templateUrl: './athlete-create.component.html',
  styleUrls: ['./athlete-create.component.scss']
})
export class AthleteCreateComponent implements OnInit {

  defaultImage: string = 'assets/images/profile-image.jpg';
  viewImage: string = this.defaultImage;
  uploadImage: string = '';
  imageDto: ImageDto = new ImageDto();

  selectedEventsList: EventDto[] = [];
  nonSelectedEventList: EventDto[] = [];

  todayDate: Date = new Date();

  genderList: GenderDto[] = [];
  //   {id: '1', gender: 'm'},
  //   {id: '2', gender: 'f'},
  // ];

  countryList: CountryDto[] = [];
  //   {id: '1', country: 'SL'},
  //   {id: '2', country: 'UK'},
  //   {id: '3', country: 'AS'},
  // ];
  eventList: EventDto[] = [];
  //   {id: '1', event: '100m'},
  //   {id: '2', event: '200m'},
  //   {id: '3', event: '400m'},
  // ];

  constructor(
    private snackbarService: SnackBarService,
    private athleteService: AthleteService
  ) {

  }

  createAthleteForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    gender: new FormControl("", [Validators.required]),
    dob: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
  });

  ngOnInit(): void {
    this.athleteService.getAllCommonData().subscribe(res => {
      let responce: CommonResponse<AthleteResponseDto> = res as CommonResponse<AthleteResponseDto>;
      if (responce.code === 200) {
        this.commonDataSet(responce.content);
      } else {
        this.snackbarService.showSnackbar(responce.message, 'Close');
      }
    }, error => {
      this.snackbarService.showSnackbar('Something went wrong', 'Close');
    });
  }

  commonDataSet(loadData:AthleteResponseDto){
    loadData.country.forEach(value => this.countryList.push(value));
    loadData.gender.forEach(value => this.genderList.push(value));
    loadData.event.forEach(value => this.eventList.push(value));

    this.eventList.forEach(item => {
      this.nonSelectedEventList.push(item);
    });
  }

  onSelectImage($event: any) {
    if (this.validateUploadFileType(event)) {
      if (this.validateUploadFileTSize(event)) {
        try {
          const reader = new FileReader();
          reader.readAsDataURL($event.target.files[0]);
          reader.onload = () => {
            this.uploadImage = reader.result as string;
            this.viewImage = this.uploadImage;
            this.imageDto.imageType = $event.target.files[0].type;
            this.imageDto.imageName = $event.target.files[0].name;
            // this.imageDto.imageData = 'aaaaaaaaaaaaaaaaaa';
            this.imageDto.imageData = this.uploadImage.split(',')[1];
          }
        } catch (e) {
          this.snackbarService.showSnackbar('Image Loading Error', 'Close');
        }
      } else {
        this.snackbarService.showSnackbar('File size cannot be greater than 5MB', 'Close');
      }
    } else {
      this.snackbarService.showSnackbar('Only JPEG, JPG or PNG files are allowed.', 'Close');
    }
  }

  removePhoto() {
    this.viewImage = this.defaultImage;
    this.uploadImage = '';
    this.imageDto = new ImageDto();
  }

  clearImagesOnClick = (event: any) => {
    event.target.value = ''
  }

  validateUploadFileType(event: any): boolean {
    let fileName = event.target.files[0].name.split('.').pop().toLowerCase();
    if ((fileName == 'png' || fileName == 'pdf' || fileName == 'jpg' || fileName == 'jpeg')) {
      return true;
    }
    return false;
  }

  validateUploadFileTSize(event: any): boolean {
    let fileSize: bigint = event.target.files[0].size;
    let maxFileSize: number = 5242880;
    if (fileSize < maxFileSize) {
      return true;
    }
    return false;
  }

  dobValidate() {
    let date: Date = new Date(this.createAthleteForm.get('dob')?.value!)
    if ((new Date().getFullYear() - date.getFullYear()) >= 16) {

    } else {
      this.createAthleteForm.get('dob')?.setValue('');
      this.snackbarService.showSnackbar('Birthday must be grater than 16', 'Close');
    }
  }

  convertDateToDateStr(dateStr: Date): string {
    return `${dateStr.getFullYear()}-${this.prependZero(dateStr.getMonth())}-${this.prependZero(dateStr.getDate() + 1)}`
  }

  prependZero(num: number) {
    return (num < 10) ? `0${num}` : num;
  }

  attachEvents(item: string) {
    if (item != null && item != undefined) {
      this.nonSelectedEventList.forEach((value, index) => {
        if (value.id == item) {
          this.selectedEventsList.push(value);
          this.nonSelectedEventList.splice(index, 1);
        }
      });
    }
  }

  removeEvent(item: string) {
    if (item != null && item != undefined) {
      this.selectedEventsList.forEach((value, index) => {
        if (value.id == item) {
          this.nonSelectedEventList.push(value);
          this.selectedEventsList.splice(index, 1);
        }
      });
    }
  }

  onSubmit() {
    if (!this.createAthleteForm.invalid && this.selectedEventsList.length > 0) {
      let selectEventList: string[] = this.selectedEventsList.map(val => val.id);
      if (this.imageDto.imageData == '') {
        this.imageDto = new ImageDto();
      }
      let athleteCreateDetails = new AthleteDto(
        this.createAthleteForm.get('firstName')?.value!,
        this.createAthleteForm.get('lastName')?.value!,
        this.createAthleteForm.get('country')?.value!,
        this.createAthleteForm.get('gender')?.value!,
        this.convertDateToDateStr(new Date(this.createAthleteForm.get('dob')?.value!)),
        this.imageDto,
        selectEventList
      );

      this.athleteService.createAthlete(athleteCreateDetails).subscribe(res => {
        let responce: CommonResponse<AthleteDto> = res as CommonResponse<AthleteDto>;
        if (responce.code === 201) {
          this.snackbarService.showSnackbar('Athlete Successfully Created!', 'Close');
          this.refreshForm();
        } else {
          this.snackbarService.showSnackbar(responce.message, 'Close');
        }
      }, error => {
        this.snackbarService.showSnackbar('Something went wrong', 'Close');
      });
    } else {
      this.snackbarService.showSnackbar('Details Invalid', 'Close');
    }
  }

  refreshForm() {
    this.createAthleteForm.reset();
    this.removePhoto();
    this.selectedEventsList = [];
    this.eventList.forEach(item => {
      this.nonSelectedEventList.push(item);
    });
  }
}
