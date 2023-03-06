import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageComponent} from './page.component';

const routes: Routes = [
  {path: '', component: PageComponent},
  { path: 'athlete', loadChildren: () => import('./athlete/athlete.module').then(m => m.AthleteModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule {
}
