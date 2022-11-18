import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Employe } from 'src/app/models/Employe';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { MedicalVisiteService } from 'src/app/services/medical-visite.service';

@Component({
  selector: 'app-details-add-visit-medicale',
  templateUrl: './details-add-visit-medicale.component.html',
  styleUrls: ['./details-add-visit-medicale.component.css']
})
export class DetailsAddVisitMedicaleComponent implements OnInit {
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

   /**
     * form group for every step
     */
  VesitMed!: FormGroup;


    shortLinkvisiteMedicalesf$: any = [];


    fileToUploadvisiteMedicales: File[] = [];
  constructor( private medicalVisiteService: MedicalVisiteService,private fileUploadService: FileUploadService, public datepipe: DatePipe,private formBuilder: FormBuilder) { }

  ngOnInit(): void {

          this.VesitMed = this.formBuilder.group({
            visiteMedicales: new FormControl('', Validators.required),
      DateVisiteMedicale: new FormControl(''),
      DateProchVisiteMedicale: new FormControl(''),
          });
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


  saveVistMed() {
    this.uploadvisiteMedicalesf(this.fileToUploadvisiteMedicales);
    const vesMid = {
      dateOfMv:
        this.VesitMed.value.DateVisiteMedicale,
        dateOfNextMv:
        this.VesitMed.value.DateProchVisiteMedicale,


        attachedDocsList: this.shortLinkvisiteMedicalesf$,
    };
    console.log(vesMid);
    this.medicalVisiteService
      .create(this.currentEmployee.id, vesMid)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.submitted = true;
        },
        error: (err) => {
          console.log('adding Visite Medical failed ');
          this.errorMessage = err.error.message;
          this.isaddedfailed = true;
        },
      });
    this.shortLinkvisiteMedicalesf$ = [];
  }

  resetshortlinks() {
    console.log('reseting short links ');

    this.shortLinkvisiteMedicalesf$ = [];
  }

}
