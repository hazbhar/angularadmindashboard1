import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Formation } from 'src/app/models/Formation';
import { Habilitation } from 'src/app/models/Habilitation';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FormationService } from 'src/app/services/formation.service';

@Component({
  selector: 'app-edit-formation',
  templateUrl: './edit-formation.component.html',
  styleUrls: ['./edit-formation.component.css'],
})
export class EditFormationComponent implements OnInit {
  datePipe = new DatePipe('en-US');

  submitted = false;
  periodiq: boolean = false;
  errorMessage='';
  isaddedfailed=false;
  fileToUploadformationFile: File[] = [];
  fileToUploadhabilitationFile: File[] = [];

  shortLinkhabilitationFile$: any = [];
  shortLinkformationFile$: any = [];
  constructor(
    private formationService: FormationService,
    private route: ActivatedRoute,
    private router: Router,
    private fileUploadService: FileUploadService
  ) {}
  formation: Formation

  ngOnInit(): void {
    this.getFormationById(this.route.snapshot.params['id']);

  }

  editFormation(formation: Formation): void {
    console.log('test ');
    formation.periodec=this.periodiq
    this.formationService.update(formation).subscribe({
      next: (res: any) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e: any) =>{ console.error(e);
        this.isaddedfailed=true
      }
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
    console.log("ici")


    this.formationService.get(id).subscribe({
      next: (data: any) => {
        console.log("ici")

        console.log(data);
        this.formation = data;

      },
      error: (e: any) => console.error(e),
    });
  }
}
