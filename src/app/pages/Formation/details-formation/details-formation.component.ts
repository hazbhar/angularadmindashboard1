import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Formation } from 'src/app/models/Formation';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FormationService } from 'src/app/services/formation.service';

@Component({
  selector: 'app-details-formation',
  templateUrl: './details-formation.component.html',
  styleUrls: ['./details-formation.component.css']
})
export class DetailsFormationComponent implements OnInit {
  @Input() currentEmployee:any
  addformation = false;


  formation$: Formation;

  fileToUploadformationFile: File[] = [];
  fileToUploadhabilitationFile: File[] = [];

  shortLinkhabilitationFile$: any = [];
  shortLinkformationFile$: any = [];

  formations$: Formation[] = [];
  isaddedfailed=false;
  isupdatedfailed = false;
  submitted=false;
  deleted = false;
  isdeletedfailed = false;
  errorMessage = '';

  periodic: boolean = false;

  datePipe = new DatePipe('en-US');

  constructor(    private formationService: FormationService,private formBuilder: FormBuilder,private fileUploadService: FileUploadService,    public datepipe: DatePipe,

    ) { }

    async ngOnInit() {

    for (
      let i = 0;
      i < this.currentEmployee['employeeFormationList'].length;
      i++
    ) {
      let id = this.currentEmployee['employeeFormationList'][i];
     await this.getFormations(id['id'], i);
    }
  }
  editFormation(formation: Formation): void {
    console.log('test ');

    this.formationService.update(formation).subscribe({
      next: (res: any) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e: any) => console.error(e),
    });
  }

  onChangeperiodiqu(e: any) {
    if (e.target.value === 'true') {
      this.periodic = true;
      /*this.formation["periodec"].controls[0].setValidators([ Validators.required]);*/
    } else {
      this.periodic = false;
    }
    console.log(this.periodic);
  }




  handleFileInputformationFile(event: any) {
    this.fileToUploadformationFile.push(<File>event.target.files[0]);
  }
  handleFileInputhabilitationFile(event: any) {
    this.fileToUploadhabilitationFile.push(<File>event.target.files[0]);
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
  getFormationById(id: any) {
    console.log('ici');

    this.formationService.get(id).subscribe({
      next: (data: any) => {
        console.log('ici');

        console.log(data);
        this.formation$ = data;
      },
      error: (e: any) => console.error(e),
    });
  }
  async getFormations(id: any, x: any) {
    this.formationService.getByRelationEmpId(id).subscribe((data: Formation) => {
      this.formations$[x] = data;
      console.log(this.formations$[x]);
    });
  }
  deleteFormation(id: number): void {
    // this.formationService.get(1);
    this.formationService.delete(id).subscribe({
      next: (res) => {
        this.deleted = true;
        console.log(res);
      },
      error: (e) => {
        this.isdeletedfailed = true;
        this.errorMessage = e.message;
        console.error(e);
      },
    });
  }


    resetshortlinks() {
      console.log('reseting short links ');

      this.shortLinkhabilitationFile$ = [];
      this.shortLinkformationFile$ = [];

    }
}
