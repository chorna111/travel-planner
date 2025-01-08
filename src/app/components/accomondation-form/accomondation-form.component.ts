import { Component, Input} from '@angular/core';
import { Accomondation } from '../../models/accomondation';
import { FormDataService } from '../../services/form-data.service';
import { Router } from '@angular/router';
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
    facilitiesList: string[] = ['Wi-Fi', 'Klimatyzacja', 'Parking', 'Basen', 'Siłownia'];
    save(){
      this.formDataService.saveAccomondation(this.accomondation)


      console.log(this.accomondation)
      this.router.navigate(['/activity-form'])
    }

    updateFacilities(event:any,facility:string){
      if(event.target.checked){
        this.accomondation.facilities.push(facility)
      }else{
        const index=this.accomondation.facilities.indexOf(facility)
        if(index!==-1){
          this.accomondation.facilities.splice(index,1)
        }
      }

    }

}
