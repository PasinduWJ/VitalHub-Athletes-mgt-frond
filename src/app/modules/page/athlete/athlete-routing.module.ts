import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./components/dashboard-view/dashboard/dashboard.component";
import {AthleteCreateComponent} from "./components/athlete-create/athlete-create.component";
import {AthleteComponent} from "./athlete.component";

const routes: Routes = [
  {
    path: '', component: AthleteComponent, children: [
      {path: '', redirectTo: "/page/athlete/dashboard", pathMatch: "full"},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'create', component: AthleteCreateComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AthleteRoutingModule {
}
