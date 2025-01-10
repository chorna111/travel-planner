import { Component, Input, ViewChild,ElementRef,OnInit,AfterViewInit} from '@angular/core';
import { Accomondation } from '../../models/accomondation';
import { FormDataService } from '../../services/form-data.service';
import { Router } from '@angular/router';
declare var google:any;
@Component({
  selector: 'app-accomondation-form',
  templateUrl: './accomondation-form.component.html',
  styleUrl: './accomondation-form.component.scss'
})
export class AccomondationFormComponent {

    constructor(public formDataService: FormDataService,private router:Router) {
      this.accomondation = this.formDataService.getAccomondation();

    }
    @Input()



    accomondation:Accomondation=new Accomondation()
    showDetails=false
    @ViewChild('inputAccomondation', { static: false }) inputAccomondation!: ElementRef;
    ngOnInit():void{}
    ngAfterViewInit():void{
      const autocomplete=new google.maps.places.Autocomplete(this.inputAccomondation.nativeElement, {types:['lodging'], componentRestrictions:{country:this.formDataService.trip.countryCode}})
      autocomplete.setFields(['name','formatted_address','geometry','opening_hours','place_id','price_level','rating','vicinity','dine_in','formatted_phone_number'])
      autocomplete.setBounds(this.formDataService.trip.bounds)
      autocomplete.addListener('place_changed',()=>{
        const place=autocomplete.getPlace()
        this.formDataService.accomondation.name=place.name

        //do aktywności
        // if (place.opening_hours) {
        //   console.log('Opening hours:', place.opening_hours);
        //   if (place.opening_hours.weekday_text) {
        //     console.log('Weekday text:', place.opening_hours.weekday_text);
        //     this.formDataService.accomondation.openingHours = place.opening_hours.weekday_text;
        //   } else {
        //     console.log('Brak danych o godzinach otwarcia');
        //     this.formDataService.accomondation.openingHours = [];
        //   }
        // } else {
        //   console.log('Brak danych o godzinach otwarcia');
        //   this.formDataService.accomondation.openingHours = [];
        // }//
        this.formDataService.accomondation.details=[]
        // if(place.formatted_address){
        //   this.formDataService.accomondation.details.push(`Adres: ${place.formatted_address}`)
        // }
        if(place.vicinity){
          this.formDataService.accomondation.details.push(`Adres: ${place.vicinity}`)
        }
        if(place.price_level){
          this.formDataService.accomondation.details.push(`Poziom_cenowy: ${place.price_level}`)
        }
        if(place.rating){
          this.formDataService.accomondation.details.push(`Ocena: ${place.rating}`)
        }
        if(place.dine_in){
          this.formDataService.accomondation.details.push(`Jedzenie na miejszu: ${place.dine_in? 'Tak':'Nie'}`)
        }
        if(place.formatted_phone_number){
          this.formDataService.accomondation.details.push(`Numer telefonu: ${place.formatted_phone_number}`)
        }









      })




    }



    save(){
      this.formDataService.saveAccomondation(this.accomondation)


      console.log(this.accomondation)
      this.router.navigate(['/activity-form'])
    }

    buttonDetailsClicked(){
      this.showDetails=!this.showDetails
    }


}
