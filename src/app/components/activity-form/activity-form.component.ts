import { Component,input,Input, ViewChild,ElementRef } from '@angular/core';
import { Activity } from '../../models/activity';
import { FormDataService } from '../../services/form-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrl: './activity-form.component.scss'
})
export class ActivityFormComponent {
  activities:Activity[]=[]
  //@Input()
  activity:Activity=new Activity()



  @ViewChild('inputActivity', { static: false }) inputActivity!: ElementRef;
  constructor(public formDataService: FormDataService,private router:Router) {}


  ngOnInit():void{
    this.activities=this.formDataService.getActivities()
    const activityToEdit=this.formDataService.getActivityToEdit()
    if(activityToEdit){
      const indexOfEditActivity=this.activities.indexOf(activityToEdit)
      this.activity=activityToEdit

      this.activities[indexOfEditActivity]=this.activity
    }
  }
  ngAfterViewInit():void{
    if(this.formDataService.activityToEdit){
       this.activity=this.formDataService.activityToEdit

     }
    const activityToEdit=this.formDataService.getActivityToEdit()
    if(activityToEdit){
      const indexOfEditActivity=this.activities.indexOf(activityToEdit)
      this.activity=activityToEdit
      this.activities.splice(indexOfEditActivity,1)
    }
    const autocomplete=new google.maps.places.Autocomplete(this.inputActivity.nativeElement, {types:['establishment']})
    autocomplete.setFields(['name','address_components'])
    autocomplete.setBounds(this.formDataService.trip.bounds)

    autocomplete.addListener('place_changed',()=>{
      const place=autocomplete.getPlace()
      if(place){
        this.activity.title=place.name||""
      }
    })
  }






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






