import { Injectable } from '@angular/core';
import { Trip } from '../models/trip';
import { Accomondation } from '../models/accomondation';
import { Activity } from '../models/activity';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  constructor() { }
  trip: Trip=new Trip()
  accomondation:Accomondation=new Accomondation()
  activities: Activity[]=[]

  saveTrip(newTrip:Trip){
    this.trip = newTrip
  }
  saveAccomondation(newAccomondation:Accomondation){
    this.accomondation = newAccomondation
  }
  getTrip(){
    return this.trip;
  }
  getAccomondation(){
    return this.accomondation
  }
  getActivities(){
    return this.activities
  }
}
