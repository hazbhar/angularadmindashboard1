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

datePipe = new DatePipe('en-US');

isupdatedfailed = false;
isaddedfailed = false;
submitted = false;
deleted = false;
isdeletedfailed = false;
errorMessage = '';
message = '';

addVisitMed = false;



  shortLinkvisiteMedicalesf$: any = [];


  fileToUploadvisiteMedicales: File[] = [];

  medicalvisit$: MedicalVisit[] = [];
  visible = true;

  constructor( private medicalVisiteService: MedicalVisiteService,private fileUploadService: FileUploadService, public datepipe: DatePipe,private formBuilder: FormBuilder) { }

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


  handleFileIvisiteMedicales(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.fileToUploadvisiteMedicales.push(<File>event.target.files[i]);
    }
  }



  async uploadvisiteMedicalesf(fil: File[]) {
    console.log('uploadvisiteMedicalesf');
    console.log(fil);
    console.log(fil.length);
    for (let f of fil) {
      const formData = new FormData();

      formData.append('document', f);

      await this.fileUploadService
        .upload(formData)
        .toPromise()
        .then((res) => {
          console.log(res);

          this.shortLinkvisiteMedicalesf$.push(res);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          this.isaddedfailed = true;
        });
    }
  }



  async  getMedicalvisits(id: any, x: any) {
   await this.medicalVisiteService.get(id).subscribe({
    next: (data) => {
      this.medicalvisit$[x] = data;
      console.log(this.medicalvisit$[x]);
    },
    error: (e) => console.error(e),
  });
}

  /**
   * getting values inserted in the forms
   */

   updateVistMed(med: any) {
    this.message = '';
    console.log(med);
    this.medicalVisiteService.update(med.id, med).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : 'This medical visit was updated successfully!';
      },
      error: (e) => console.error(e),
    });
  }


  deleteVisitMed(id : any){
    this.medicalVisiteService.delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : 'This medical visit was deleted successfully!';
          this.isdeletedfailed=true;
      },
      error: (e) => console.error(e),
    });
  }

  resetshortlinks() {
    console.log('reseting short links ');

    this.shortLinkvisiteMedicalesf$ = [];
  }
}
