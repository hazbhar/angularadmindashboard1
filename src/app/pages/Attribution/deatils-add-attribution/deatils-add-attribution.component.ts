
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Employe } from 'src/app/models/Employe';
import { AttributionService } from 'src/app/services/attribution.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-deatils-add-attribution',
  templateUrl: './deatils-add-attribution.component.html',
  styleUrls: ['./deatils-add-attribution.component.css']
})
export class DeatilsAddAttributionComponent implements OnInit {
@Input() currentEmployee:Employe;
  errorMessage = '';
  message = '';

  addatrribution = false;
  isaddedfailed = false;
submitted = false;


fileToUploadAttributionf: File[] = [];

shortLinkAttributionf$: any = [];

  AttributionForm!: FormGroup;
  constructor(private attributionService: AttributionService,private fileUploadService: FileUploadService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.AttributionForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      attribfile: new FormControl('', Validators.required),
    });
  }

  handleFileInputAttributionf(event: any) {
    this.fileToUploadAttributionf.push(<File>event.target.files[0]);
  }


  async uploadAttributionf(fil: File[]) {
    console.log('uploadAttributionf');
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
          this.shortLinkAttributionf$.push(res);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          this.isaddedfailed = true;
        });
    }
  }
  async saveAttribution() {
   await this.uploadAttributionf(this.fileToUploadAttributionf);

    const attribu = {
      title: this.AttributionForm.value[0].title,
      dateAttribution: null,
      attacheDocsList: this.shortLinkAttributionf$,
    };
    console.log(attribu);
    this.attributionService
      .create(attribu, this.currentEmployee.id)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.submitted = true;
        },
        error: (err) => {
          console.log('adding Attribution failed ');
          this.errorMessage = err.error.message;
          this.isaddedfailed = true;
        },
      });
  }
  resetshortlinks() {
    console.log('reseting short links ');

    this.shortLinkAttributionf$ = [];

  }
}
