import {Component} from '@angular/core';
import {LoadingService} from "./modules/share/core/loading-page/loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AthletesManagement';

  constructor(public loadingService: LoadingService) {
  }
}
