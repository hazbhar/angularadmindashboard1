import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MedicalVisit } from 'src/app/models/MedicalVisit';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { MedicalVisiteService } from 'src/app/services/medical-visite.service';

@Component({
  selector: 'app-details-visit-med',
  templateUrl: './details-visit-med.component.html',
  styleUrls: ['./details-visit-med.component.css']
})
export class DetailsVisitMedComponent implements OnInit {
@Input() currentEmployee:any

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
 /**
   * form arrays for every possible multiple same formgroup
   */
  VesitMeditems!: FormArray;


  shortLinkvisiteMedicalesf$: any = [];


  fileToUploadvisiteMedicales: File[] = [];

  medicalvisit$: MedicalVisit[] = [];
  visible = true;

  constructor( private medicalVisiteService: MedicalVisiteService,private fileUploadService: FileUploadService, public datepipe: DatePipe,private formBuilder: FormBuilder) { }

  toggleCollapse(): void {
    this.visible = !this.visible;
  }
  async ngOnInit() {
        /*
     * from arrays that possible to be multiple
     */
    this.VesitMed = this.formBuilder.group({
      vesitmed: new FormArray([]),
    });

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
    this.medicalVisiteService.get(id).subscribe((data: MedicalVisit) => {
      this.medicalvisit$[x] = data;
      console.log(this.medicalvisit$[x]);
    });
  }


  get infodesVesitMed() {
    return this.VesitMed.controls;
  }
  get VesitMedsform() {
    return this.VesitMed.get('vesitmed') as FormArray;
  }



  /**
   * function to add new form group medical visit in the form array
   */
   addnewVesitMed() {
    this.VesitMeditems = this.VesitMed.get('vesitmed') as FormArray;
    this.VesitMeditems.push(this.gennewVesitMed());
    this.addVisitMed = true;
  }
  /**
   * function to add new form group medical visit in the form array
   */
  delnewVesitMed(index: any) {
    this.VesitMeditems = this.VesitMed.get('vesitmed') as FormArray;
    this.VesitMeditems.removeAt(index);
    this.addVisitMed = false;
  }
  /**
   * function to generate new form group medical visit before adding it to the form array
   */
  gennewVesitMed(): FormGroup {
    return new FormGroup({
      visiteMedicales: new FormControl('', Validators.required),
      DateVisiteMedicale: new FormControl(''),
      DateProchVisiteMedicale: new FormControl(''),
    });
  }




  /**
   * getting values inserted in the forms
   */

   updateVistMed(med: any) {
    this.message = '';

    this.medicalVisiteService.update(med.id, med).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : 'This medical visit was updated successfully!';
          window.location.reload();
      },
      error: (e) => console.error(e),
    });
  }


   saveVistMed() {
    this.uploadvisiteMedicalesf(this.fileToUploadvisiteMedicales);
    const vesMid = {
      dateOfMv: this.datePipe.transform(
        this.VesitMedsform.value[0].DateVisiteMedicale,
        'dd-MM-yyyy'
      ),
      dateOfNextMv: this.datePipe.transform(
        this.VesitMedsform.value[0].DateProchVisiteMedicale,
        'dd-MM-yyyy'
      ),
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
