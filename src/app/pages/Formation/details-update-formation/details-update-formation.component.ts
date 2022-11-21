import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Formation } from 'src/app/models/Formation';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FormationService } from 'src/app/services/formation.service';

@Component({
  selector: 'app-details-update-formation',
  templateUrl: './details-update-formation.component.html',
  styleUrls: ['./details-update-formation.component.css']
})
export class DetailsUpdateFormationComponent implements OnInit {
  @Input() element:Formation;

  formation$: Formation;

  fileToUploadformationFile: File[] = [];
  fileToUploadhabilitationFile: File[] = [];

  shortLinkhabilitationFile$: any = [];
  shortLinkformationFile$: any = [];

  isaddedfailed = false;
  isupdatedfailed = false;
  submitted = false;
  deleted = false;
  isdeletedfailed = false;
  errorMessage = '';

  periodic: boolean = false;

  datePipe = new DatePipe('en-US');

  constructor(  private formationService: FormationService,private fileUploadService: FileUploadService,
    public datepipe: DatePipe) { }

  ngOnInit(): void {
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
