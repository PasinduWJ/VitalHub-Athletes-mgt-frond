import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-athlete-header',
  templateUrl: './athlete-header.component.html',
  styleUrls: ['./athlete-header.component.scss']
})
export class AthleteHeaderComponent {

  constructor(public router: Router) {

  }
}
