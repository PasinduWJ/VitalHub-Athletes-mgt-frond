import {Component, Input, OnInit} from '@angular/core';
import AthleteView from "../../../../../share/dto/AthleteView";

@Component({
  selector: 'app-athlete-details',
  templateUrl: './athlete-details.component.html',
  styleUrls: ['./athlete-details.component.scss']
})
export class AthleteDetailsComponent implements OnInit {

  @Input() athleteDetail: AthleteView = new AthleteView();

  public defaultImage: string = 'assets/images/profile-image.jpg';
  public viewImage: string = '';

  constructor() {
  }

  ngOnInit(): void {
    if (this.athleteDetail.image != null && this.athleteDetail.image != '') {
      this.viewImage = this.athleteDetail.image
    } else {
      this.viewImage = this.defaultImage
    }
  }
}
