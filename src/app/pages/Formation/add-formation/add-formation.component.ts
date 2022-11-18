import { FormationService } from 'src/app/services/formation.service';
import { Formation } from 'src/app/models/Formation';
import { Component, Input, OnInit ,ViewEncapsulation } from '@angular/core';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { EmployeService } from 'src/app/services/employe.service';
import { Employe } from 'src/app/models/Employe';

@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class AddFormationComponent implements OnInit {
  EmpData$:any;
/**
 * test ng select
 */

 selected:Employe[] = [];

  /**
 * boolean array for periodic formation wich can be  multiple
 */
   periodiq: boolean = false;


  fileToUploadformationFile: File[] = [];
  fileToUploadhabilitationFile: File[] = [];

  shortLinkhabilitationFile$: any = [];
  shortLinkformationFile$: any = [];

  Competences!: FormGroup;
  formatitems!: FormArray;

  submitted = false;

  errorMessage: any;
  isaddedfailed: any;
  constructor(private formationService: FormationService,private formBuilder: FormBuilder,    private fileUploadService: FileUploadService,private employeService : EmployeService
    ) {
      this.getemployees();
      this.Competences = this.formBuilder.group({
        title:['', Validators.required],
        periodec: ['', Validators.required],
        dateRenouvellement:['', Validators.required],
        formationFile: ['', Validators.required],
        habilitation: ['', Validators.required],
        dateHabilitation: ['', Validators.required],
        dateRenHabi: ['', Validators.required],
        habilitationFile:['', Validators.required],
      });
    }

   ngOnInit() {


  }



  onChangeperiodique(e: any) {
    if (e.target.value === 'true') {
      this.periodiq = true;
      /*this.formation["periodec"].controls[0].setValidators([ Validators.required]);*/
console.log(this.selected)
    } else {

      this.periodiq = false;
    }
    console.log(this.periodiq);
  }
  handleFileInputformationFile(event: any) {
    this.fileToUploadformationFile.push(<File>event.target.files[0]);
  }

  async uploadhabilitationFile(fil: File[]) {
    console.log('habili');
    console.log(fil);
    console.log(fil.length);
    const formData = new FormData();

    for (let f of fil) {
      formData.append('document', f);

      await this.fileUploadService
        .upload(formData)
        .toPromise()
        .then((res) => {
          console.log(res);
          this.shortLinkhabilitationFile$.push(res);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          this.isaddedfailed = true;
        });

      // Store form name as "file" with file data
    }
  }

  async uploadformationFile(fil: File[]) {
    console.log('uploadformationFile');
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
          this.shortLinkformationFile$.push(res);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          this.isaddedfailed = true;
        });
    }
  }
  get format() {
    return this.Competences.get('formation') as FormArray;
  }
  get formcont() {
    return this.format.controls;
  }
  handleFileInputhabilitationFile(event: any) {
    this.fileToUploadhabilitationFile.push(<File>event.target.files[0]);
  }
  getemployees(){
     this.employeService.getAll().subscribe({
      next: (data) =>{
        this.EmpData$=data;
        console.log(this.EmpData$)

      },
      error:(err)=>{
        console.log(err.message)

      }
    })
  }
saveformation(){
  this.uploadhabilitationFile(this.fileToUploadhabilitationFile);
  this.uploadformationFile(this.fileToUploadformationFile);

  const forma={
    employee: null,
    formation: {
      title: this.Competences.value.title,
      description: this.Competences.value.description,
      periodec: this.Competences.value.periodic,
      enabled: true,

      habilitationList: [
        {
          title: this.Competences.value.habilitation,
          habilitationDate: this.Competences.value.dateHabilitation,
          habilitationRenewalDate: this.Competences.value.dateRenHabi,
          validity: true,
          attacheDocsList:
            this.shortLinkhabilitationFile$,
        },
      ],
      attacheDocsList: this.shortLinkformationFile$,
    },

  };
  console.log(forma)
  for(let emp of this.selected){
    console.log (emp.id)

  this.formationService.create(forma,emp.id,this.Competences.value.dateRenouvellement,).subscribe({
    next: (res: any) => {
      console.log(res);
      this.submitted = true;
    },
    error: (err) => {
      console.log('adding Employee failed ');
      this.errorMessage = err.error.message;
      this.isaddedfailed = true;
    },
  });
}
}
}
