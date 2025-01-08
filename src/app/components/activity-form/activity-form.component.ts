import { Component,input,Input } from '@angular/core';
import { Activity } from '../../models/activity';
import { FormDataService } from '../../services/form-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrl: './activity-form.component.scss'
})
export class ActivityFormComponent {
  constructor(public formDataService: FormDataService,private router:Router) {}
  @Input()
  activity:Activity=new Activity()
  saveActivity(){
    this.formDataService.activities.push({ ...this.activity });
    console.log('Dodano aktywność:', this.formDataService.activities);

    this.activity = new Activity();
  }
  save(){
    this.formDataService.activities.push({ ...this.activity });
    console.log('Dodano aktywność:', this.formDataService.activities);
    console.log('zawartość serwisu',this.formDataService)

    this.activity = new Activity();
    this.router.navigate(['/summary'])
  }



}
