import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { TravelFormComponent } from './components/travel-form/travel-form.component';
import { AccomondationFormComponent } from './components/accomondation-form/accomondation-form.component';
import { ActivityFormComponent } from './components/activity-form/activity-form.component';
import { FormsModule } from '@angular/forms';
import { SummaryComponent } from './components/summary/summary.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    TravelFormComponent,
    AccomondationFormComponent,
    ActivityFormComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
