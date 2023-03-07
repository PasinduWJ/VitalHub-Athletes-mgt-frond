import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

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


  constructor() {
  }

  searchForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    event: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {

  }



}
