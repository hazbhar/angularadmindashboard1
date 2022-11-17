import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FormationService } from 'src/app/services/formation.service';

@Component({
  selector: 'app-deatils-add-formation',
  templateUrl: './deatils-add-formation.component.html',
  styleUrls: ['./deatils-add-formation.component.css']
})
export class DeatilsAddFormationComponent implements OnInit {
  @Input() currentEmployeeid : any;
  Competences!: FormGroup;
  formatitems!: FormArray;

  fileToUploadformationFile: File[] = [];
  fileToUploadhabilitationFile: File[] = [];

  shortLinkhabilitationFile$: any = [];
  shortLinkformationFile$: any = [];

  isaddedfailed = false;
  submitted = false;

  errorMessage = '';

  periodiq: boolean = false;

  datePipe = new DatePipe('en-US');

  constructor(private formationService: FormationService,private formBuilder: FormBuilder,private fileUploadService: FileUploadService,    public datepipe: DatePipe,) { }

  ngOnInit(): void {
    this.Competences = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      periodec: new FormControl(''),
      dateRenouvellement: new FormControl(''),
      formationFile: new FormControl('', Validators.required),
      habilitation: new FormControl('', Validators.required),
      dateHabilitation: new FormControl('', Validators.required),
      dateRenHabi: new FormControl('', Validators.required),
      habilitationFile: new FormControl('', Validators.required),
    });
  }
  get format() {
    return this.Competences.get('format') as FormArray;
  }
  get formcont() {
    return this.Competences.controls;
  }

  onChangeperiodique(e: any) {
    if (e.target.value === 'true') {
      this.periodiq = true;
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

    saveformation() {
      this.uploadhabilitationFile(this.fileToUploadhabilitationFile);
      this.uploadformationFile(this.fileToUploadformationFile);

      const forma =
         {
          title: this.Competences.value.title,
          description: this.Competences.value.description,
          periodec: this.periodiq,
          enabled: true,

          habilitationList: [
            {
              title: this.Competences.value.habilitation,
              habilitationDate: this.Competences.value.dateHabilitation,
              habilitationRenewalDate: this.Competences.value.dateRenHabi,
              validity: true,
              attacheDocsList: this.shortLinkhabilitationFile$,
            },
          ],
          attacheDocsList: this.shortLinkformationFile$,


      };
      console.log(forma);
      this.formationService.create(forma, this.currentEmployeeid,this.Competences.value.dateRenouvellement).subscribe({
        next: (res: any) => {
          console.log(res);
          this.submitted = true;
        },
        error: (err) => {
          console.log('adding formation failed ');
          this.errorMessage = err.error.message;
          this.isaddedfailed = true;
        },
      });
    }
}
