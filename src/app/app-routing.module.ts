import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { TravelFormComponent } from './components/travel-form/travel-form.component';
import { AccomondationFormComponent } from './components/accomondation-form/accomondation-form.component';
import { ActivityFormComponent } from './components/activity-form/activity-form.component';

import { SummaryComponent } from './components/summary/summary.component';
const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'trip-form', component: TravelFormComponent },
  {path:'accomondation-form',component:AccomondationFormComponent},
  {path:'activity-form',component:ActivityFormComponent},
  {path:'summary',component:SummaryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
