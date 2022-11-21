import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MedicalVisit } from 'src/app/models/MedicalVisit';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { MedicalVisiteService } from 'src/app/services/medical-visite.service';

@Component({
  selector: 'app-details-update-visit-medicale',
  templateUrl: './details-update-visit-medicale.component.html',
  styleUrls: ['./details-update-visit-medicale.component.css']
})
export class DetailsUpdateVisitMedicaleComponent implements OnInit {
  @Input() element : MedicalVisit;
  datePipe = new DatePipe('en-US');

  isupdatedfailed = false;
  isaddedfailed = false;
  submitted = false;
  deleted = false;
  isdeletedfailed = false;
  errorMessage = '';
  message = '';

    shortLinkvisiteMedicalesf$: any = [];


    fileToUploadvisiteMedicales: File[] = [];

  constructor(private medicalVisiteService: MedicalVisiteService,private fileUploadService: FileUploadService, public datepipe: DatePipe,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
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



  /**
   * getting values inserted in the forms
   */

   updateVistMed(med: any) {
    this.isupdatedfailed=false
    this.submitted=false
    this.message = '';
    console.log(med);
    this.medicalVisiteService.update(med.id, med).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : 'This medical visit was updated successfully!';
          this.submitted=true
      },
      error: (e) => {console.error(e)
      this.isupdatedfailed=true}
    });
  }


  deleteVisitMed(id : any){
    this.isdeletedfailed=false
    this.isdeletedfailed=false
    this.medicalVisiteService.delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : 'This medical visit was deleted successfully!';
          this.isdeletedfailed=true;
      },
      error: (e) => {console.error(e)
        this.isdeletedfailed=true;}
    });
  }

  resetshortlinks() {
    console.log('reseting short links ');
    this.shortLinkvisiteMedicalesf$ = [];
  }
}
