import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-athlete-create',
  templateUrl: './athlete-create.component.html',
  styleUrls: ['./athlete-create.component.scss']
})
export class AthleteCreateComponent implements OnInit{

  defaultImage: string = 'assets/images/profile-image.jpg';
  viewImage: string = this.defaultImage;
  uploadImage:string = '';

  public genderList:{id:number, gender:string}[] = [
    {id:1, gender:'m'},
    {id:2, gender:'f'},
  ];


  public countryList:{id:number, country:string}[] = [
    {id:1, country:'SL'},
    {id:2, country:'UK'},
    {id:3, country:'AS'},
  ];
  public eventList:{id:number, event:string}[] = [
    {id:1, event:'100m'},
    {id:2, event:'200m'},
    {id:3, event:'400m'},
  ];

  todayDate:Date = new Date();

  constructor() {

  }

  ngOnInit(): void {

    }

  createAthleteForm = new FormGroup({
    firstName:new FormControl("",[Validators.required]),
    lastName:new FormControl("",[Validators.required]),
    gender:new FormControl("",[Validators.required]),
    dob:new FormControl("",[Validators.required]),
    country:new FormControl("",[Validators.required]),
  });

  onSelectImage($event: Event) {
    if (this.validateUploadFileType(event)) {
      if (this.validateUploadFileTSize(event)) {

      } else {
        // this.setPassportErrorMessage(this.error.fileSizeError);
      }
    } else {
      // this.setPassportErrorMessage(this.error.fileTypeError);
    }
  }

  removePhoto() {
    this.viewImage = this.defaultImage;
    this.uploadImage = '';
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

}
