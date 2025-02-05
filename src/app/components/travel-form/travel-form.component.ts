import { Component,Input,ElementRef,ViewChild,OnInit,AfterViewInit } from '@angular/core';
import { Trip } from '../../models/trip';
import { FormDataService } from '../../services/form-data.service';
import { Router } from '@angular/router';
declare var google: any;

@Component({
  selector: 'app-travel-form',
  templateUrl: './travel-form.component.html',
  styleUrl: './travel-form.component.scss'
})
export class TravelFormComponent{
  constructor(public formDataService: FormDataService,private router:Router) {
    this.trip = this.formDataService.getTrip();
  }
  trip:Trip=new Trip()
  invalidEndDate: boolean = false;
  @ViewChild('inputCity', { static: true }) inputCity!: ElementRef;

  ngOnInit(): void{}


  ngAfterViewInit(): void {
    const autocomplete=new google.maps.places.Autocomplete(this.inputCity.nativeElement,{types:['locality']})
    autocomplete.setFields(['name','address_components','geometry'])
    autocomplete.addListener('place_changed',()=>{
      const place=autocomplete.getPlace()
      if(place){
      const countryCode=this.trip.country=place.address_components.find((component:any)=>
      component.types.includes('country'))?.short_name;
       this.trip.countryCode=countryCode
       this.trip.country=place.address_components.find((component:any)=>
         component.types.includes('country')
       )?.long_name;
       this.trip.city=place.address_components.find((component:any)=>
        component.types.includes('locality')
      )?.long_name;

       this.trip.bounds = place.geometry.bounds|| place.geometry.viewport

    }})

  }
  save(){
    if (new Date(this.trip.endDate) < new Date(this.trip.startDate)) {
      this.invalidEndDate=true;
      return;
    }
    this.formDataService.saveTrip(this.trip)
    console.log(this.trip)
    this.router.navigate(['/accomondation-form'])
  }







}
