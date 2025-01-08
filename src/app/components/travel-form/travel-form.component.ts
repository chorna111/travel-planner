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
  @ViewChild('inputCountry', { static: false }) countryInput!: ElementRef;
  @ViewChild('inputCity', { static: false }) cityInput!: ElementRef;


  constructor(public formDataService: FormDataService,private router:Router) {
    this.trip = this.formDataService.getTrip();
  }
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeAutocomplete(this.countryInput.nativeElement, 'country');
    this.initializeAutocomplete(this.cityInput.nativeElement, 'city');
  }
  initializeAutocomplete(inputElement: HTMLInputElement, type: string): void {
    const autocomplete = new google.maps.places.Autocomplete(inputElement, {
      types: ['(regions)'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if(type==='city'){
        this.trip.country=place.address_components.find((component:any)=>
          component.types.includes('country')
        )?.long_name;
        this.trip.city=place.address_components.find((component:any)=>
          component.types.includes('locality')||component.types.includes('administrative_area_level_2') ||component.types.includes('sublocality') // Podobszary
        )?.long_name;
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
