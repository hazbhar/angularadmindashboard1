import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Employe } from 'src/app/models/Employe';
import { MedicalVisit } from 'src/app/models/MedicalVisit';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { MedicalVisiteService } from 'src/app/services/medical-visite.service';

@Component({
  selector: 'app-details-visit-med',
  templateUrl: './details-visit-med.component.html',
  styleUrls: ['./details-visit-med.component.css']
})
export class DetailsVisitMedComponent implements OnInit {
@Input() currentEmployee:Employe

errorMessage = '';

addVisitMed = false;



  medicalvisit$: MedicalVisit[] = [];
  visible = true;

  constructor( private medicalVisiteService: MedicalVisiteService) { }

  toggleCollapse(): void {
    this.visible = !this.visible;
  }
  async ngOnInit() {


    for (
      let i = 0;
      i < this.currentEmployee['medicalVisitList'].length;
      i++
    ) {
      let id = this.currentEmployee['medicalVisitList'][i];
        await  this.getMedicalvisits(id['id'], i);
    }
  }


  async  getMedicalvisits(id: any, x: any) {
   await this.medicalVisiteService.get(id).toPromise()
   .then((data :any) => {
    this.medicalvisit$[x] = data;
    console.log(this.medicalvisit$[x]);
   })
   .catch((error) => {
     this.errorMessage = error.message;

   });
}

}
