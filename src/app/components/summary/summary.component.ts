import { Component } from '@angular/core';
import { FormDataService } from '../../services/form-data.service';
import { Trip } from '../../models/trip';
import { Accomondation } from '../../models/accomondation';
import { Activity } from '../../models/activity';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {

  constructor(public formDataService: FormDataService){
    this.trip=this.formDataService.getTrip()
    this.accomondation=this.formDataService.getAccomondation()
    this.activities=this.formDataService.getActivities()
  }
  trip:Trip
  accomondation:Accomondation
  activities:Activity[]





}
