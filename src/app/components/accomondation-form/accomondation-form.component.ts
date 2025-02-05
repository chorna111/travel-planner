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
    //@Input()



    accomondation:Accomondation=new Accomondation()
    showDetails=false
    @ViewChild('inputAccomondation', { static: false }) inputAccomondation!: ElementRef;
    ngOnInit():void{}
    ngAfterViewInit():void{
      const autocomplete=new google.maps.places.Autocomplete(this.inputAccomondation.nativeElement, {types:['lodging'], componentRestrictions:{country:this.formDataService.trip.countryCode}})
      autocomplete.setFields(['name','formatted_address','geometry','place_id','price_level','rating','vicinity','dine_in','formatted_phone_number'])
      autocomplete.setBounds(this.formDataService.trip.bounds)
      autocomplete.addListener('place_changed',()=>{
        const place=autocomplete.getPlace()
        this.formDataService.accomondation.name=place.name

        this.formDataService.accomondation.details=[]
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
      if (new Date(this.accomondation.depDate) < new Date(this.accomondation.arrDate)) {
        alert("Data wykwaterowania nie może być wcześniejsza niż data zakwaterowania.");
        return;
      }


      console.log(this.accomondation)
      this.router.navigate(['/activity-form'])
    }

    buttonDetailsClicked(){
      this.showDetails=!this.showDetails
    }


}
