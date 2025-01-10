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
export class TravelFormComponent implements OnInit, AfterViewInit {

  @Input()
  trip:Trip=new Trip()
  @ViewChild('inputCountry', { static: false }) inputCountry!: ElementRef;
  @ViewChild('inputCity', { static: false }) inputCity!: ElementRef;


  constructor(public formDataService: FormDataService,private router:Router) {
    this.trip = this.formDataService.getTrip();
  }
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeAutocomplete(this.inputCountry.nativeElement, 'country');
    this.initializeAutocomplete(this.inputCity.nativeElement, 'city');
  }
  initializeAutocomplete(inputRegion: HTMLInputElement, type: string): void {
    const autocomplete = new google.maps.places.Autocomplete(inputRegion, {
      types: ['(regions)'],
    });
    autocomplete.setFields(['name','address_components','geometry'])

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if(type==='city'){

        const countryCode=this.trip.country=place.address_components.find((component:any)=>
          component.types.includes('country')
        )?.short_name;
        this.trip.countryCode=countryCode
        this.trip.country=place.address_components.find((component:any)=>
          component.types.includes('country')
        )?.long_name;
        this.trip.city=place.address_components.find((component:any)=>
          component.types.includes('locality')||component.types.includes('administrative_area_level_2') ||component.types.includes('sublocality') // Podobszary
        )?.long_name;
        this.trip.bounds = place.geometry.bounds|| place.geometry.viewport


      }
      console.log(this.trip)
    });
  }
  save(){
    if (new Date(this.trip.endDate) < new Date(this.trip.startDate)) {
      alert("Data powrotu nie może być wcześniejsza niż data odjazdu.");
      return;
    }
    this.formDataService.saveTrip(this.trip)
    console.log(this.trip)
    this.router.navigate(['/accomondation-form'])
  }







}
