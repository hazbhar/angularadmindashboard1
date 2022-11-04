import { FormationService } from 'src/app/services/formation.service';
import { Formation } from 'src/app/models/Formation';
import { Component, Input, OnInit } from '@angular/core';
import { EmployeeFormation } from '../../../models/EmployeeFormation';
import { AttachedDocs } from '../../../models/AttachedDocs';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.css'],
})
export class AddFormationComponent implements OnInit {
  empid:number=0;

  /**
 * boolean array for periodic formation wich can be  multiple
 */
   periodiq: boolean = false;

  formation: Formation = {
    id: 0,
    title: undefined,
    description: undefined,
    periodec: undefined,
    enabled: undefined,
    employeeFormationList: undefined,
    habilitationList: undefined,
    attachedDocsList: undefined,
  };
  fileToUploadformationFile: File[] = [];
  fileToUploadhabilitationFile: File[] = [];

  shortLinkhabilitationFile$: any = [];
  shortLinkformationFile$: any = [];

  Competences!: FormGroup;
  formatitems!: FormArray;

  submitted = false;

  errorMessage: any;
  isaddedfailed: any;
  constructor(private formationService: FormationService,private formBuilder: FormBuilder,    private fileUploadService: FileUploadService
    ) {}

  ngOnInit(): void {
    this.Competences = this.formBuilder.group({
      formation: new FormArray([]),
    });
    this.addnewformat();
  }


  addnewformat() {
    this.formatitems = this.Competences.get('formation') as FormArray;
    this.formatitems.push(this.gennewformat());
  }
/**
   * function to add new form group diplome in the form array
   */
  delnewformat(index: any) {
    this.formatitems = this.Competences.get('formation') as FormArray;
    this.formatitems.removeAt(index);
  }
/**
   * function to generate new form group diplome before adding it to the form array
   */
  gennewformat(): FormGroup {
    return new FormGroup({
      title: new FormControl('', Validators.required),
      periodec: new FormControl(''),
      dateRenouvellement: new FormControl(''),
      formationFile: new FormControl('', Validators.required),
      habilitation: new FormControl('', Validators.required),
      dateHabilitation: new FormControl('', Validators.required),
      dateRenHabi: new FormControl('', Validators.required),
      habilitationFile: new FormControl('', Validators.required),
    });
  }

  onChangeperiodique(e: any) {
    if (e.target.value === 'true') {
      this.periodiq = true;
      /*this.formation["periodec"].controls[0].setValidators([ Validators.required]);*/

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
saveformation(){
  this.uploadhabilitationFile(this.fileToUploadhabilitationFile);
  this.uploadformationFile(this.fileToUploadformationFile);

  const forma={
    employee: null,
    formation: {
      title: this.format.value.title,
      description: this.format.value.description,
      periodec: this.format.value.periodic,
      enabled: true,

      habilitationList: [
        {
          title: this.format.value.habilitation,
          habilitationDate: this.format.value.dateHabilitation,
          habilitationRenewalDate: this.format.value.dateRenHabi,
          validity: true,
          attacheDocsList:
            this.shortLinkhabilitationFile$,
        },
      ],
      attacheDocsList: this.shortLinkformationFile$,
    },
    formationRenewalDate: this.format.value.dateRenouvellement,
  };
  this.formationService.create(forma,this.empid).subscribe({
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
