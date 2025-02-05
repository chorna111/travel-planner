import { Component } from '@angular/core';
import { FormDataService } from '../../services/form-data.service';
import { Trip } from '../../models/trip';
import { Accomondation } from '../../models/accomondation';
import { Router } from '@angular/router';
import { Activity } from '../../models/activity';



@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {

  constructor(public formDataService: FormDataService,private router:Router){
    this.trip=this.formDataService.getTrip()
    this.accomondation=this.formDataService.getAccomondation()
    this.activities=this.formDataService.getActivities()
  }
  trip:Trip
  accomondation:Accomondation
  activities:Activity[]

  editMode:boolean=false
  activityToEdit:Activity|null=null
  edit(index:number){
    this.formDataService.setActivityToEdit(index)
    //this.router.navigate(['/activity-form'])

  }







}
