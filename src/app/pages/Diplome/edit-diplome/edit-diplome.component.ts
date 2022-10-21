import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Diploma } from '../../../models/Diploma';
import { DiplomaService } from '../../../services/diplome.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { AttributionService } from 'src/app/services/attribution.service';

@Component({
  selector: 'app-edit-diplome',
  templateUrl: './edit-diplome.component.html',
  styleUrls: ['./edit-diplome.component.css'],
})
export class EditDiplomeComponent implements OnInit {
  submitted = false;
  isupdatedfailed = false;
  isaddedfailed = false;
  errorMessage = '';
  fileToUploadAttributionf: File[] = [];
  fileToUploaddiplomefile: File[] = [];

  shortLinkdiplomefile$: any = [];
  shortLinkAttributionf$: any = [];
  constructor(
    private diplomeService: DiplomaService,
    private fileUploadService: FileUploadService,
    private formBuilder: FormBuilder,
    private attributionService: AttributionService,
    private route: ActivatedRoute,

  ) {}
  diplome: Diploma;

  async ngOnInit(): Promise<void> {
    await this.getDiplomeById(this.route.snapshot.params['id']);
  }

  diplomeform = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
  });

  updatediplom(): void {
    // romove displayed data in console & add id
    this.submitted = true;
    console.log('test ');
    this.diplomeService.update(this.diplome.id, this.diplome).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (e: any) => {
        console.error(e);
        this.errorMessage = e.error.message;
        this.isupdatedfailed = true;
      },
    });
  }
  async getDiplomeById(id: any) {
     this.diplomeService
      .get(id)
      .toPromise()
      .then((data: any) => {
        this.diplome = data;
        console.log(data);

      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleFileInputdiplomefile(event: any) {
    this.fileToUploaddiplomefile.push(<File>event.target.files[0]);
  }
  handleFileInputAttributionf(event: any) {
    this.fileToUploadAttributionf.push(<File>event.target.files[0]);
  }
  async uploaddiplomefile(fil: File[]) {
    console.log('uploaddiplomefile');
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
          this.shortLinkdiplomefile$.push(res);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          this.isaddedfailed = true;
        });
    }
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
}
