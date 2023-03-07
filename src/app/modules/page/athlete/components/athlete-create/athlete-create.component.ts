import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SnackBarService} from "../../../../share/core/snack-bar.service";
import EventDto from "../../../../share/dto/EventDto";
import GenderDto from "../../../../share/dto/GenderDto";
import CountryDto from "../../../../share/dto/CountryDto";

@Component({
  selector: 'app-athlete-create',
  templateUrl: './athlete-create.component.html',
  styleUrls: ['./athlete-create.component.scss']
})
export class AthleteCreateComponent implements OnInit{

  defaultImage: string = 'assets/images/profile-image.jpg';
  viewImage: string = this.defaultImage;
  uploadImage:string = '';

  selectedEventsList:EventDto[] = [];
  nonSelectedEventList:EventDto[] = [];

  public genderList:GenderDto[] = [
    {id:'1', gender:'m'},
    {id:'2', gender:'f'},
  ];

  public countryList:CountryDto[] = [
    {id:'1', country:'SL'},
    {id:'2', country:'UK'},
    {id:'3', country:'AS'},
  ];
  public eventList:EventDto[] = [
    {id:'1', event:'100m'},
    {id:'2', event:'200m'},
    {id:'3', event:'400m'},
  ];

  todayDate:Date = new Date();

  constructor(
     public snackbarService:SnackBarService
  ) {

  }

  ngOnInit(): void {
    this.nonSelectedEventList = this.eventList;
    }

  createAthleteForm = new FormGroup({
    firstName:new FormControl("",[Validators.required]),
    lastName:new FormControl("",[Validators.required]),
    gender:new FormControl("",[Validators.required]),
    dob:new FormControl("",[Validators.required]),
    country:new FormControl("",[Validators.required]),
  });

  onSelectImage($event: any) {
    if (this.validateUploadFileType(event)) {
      if (this.validateUploadFileTSize(event)) {
        try{
          const reader = new FileReader();
          reader.readAsDataURL($event.target.files[0]);
          reader.onload = () => {
            this.uploadImage = reader.result as string;
            this.viewImage = this.uploadImage;
          }
        }catch (e) {
          this.snackbarService.showSnackbar('Image Loading Error','Close');
        }
      } else {
        this.snackbarService.showSnackbar('File size cannot be greater than 5MB','Close');
      }
    } else {
      this.snackbarService.showSnackbar('Only JPEG, JPG or PNG files are allowed.','Close');
    }
  }

  removePhoto() {
    this.viewImage = this.defaultImage;
    this.uploadImage = '';
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
    let date:Date = new Date(this.createAthleteForm.get('dob')?.value!)
    if(( new Date().getFullYear() - date.getFullYear()) >= 16){

    }else{
      this.createAthleteForm.get('dob')?.setValue('');
      this.snackbarService.showSnackbar('Birthday must be grater than 16', 'Close');
    }
  }

  convertDateToDateStr(dateStr: Date):string {
    return `${dateStr.getFullYear()}-${this.prependZero(dateStr.getMonth())}-${this.prependZero(dateStr.getDay())}`
  }

  prependZero(num: number) {
    return (num < 10) ? `0${num}` : num;
  }

  attachEvents(item:string) {
    if(item != null && item != undefined){
      this.nonSelectedEventList.forEach((value, index) => {
        if(value.id == item) {
          this.selectedEventsList.push(value);
          this.nonSelectedEventList.splice(index,1);
        }
      });
    }
  }

  removeEvent(item: string) {
    if(item != null && item != undefined){
      this.selectedEventsList.forEach((value, index) => {
        if(value.id == item) {
          this.nonSelectedEventList.push(value);
          this.selectedEventsList.splice(index,1);
        }
      });
    }
  }
}
