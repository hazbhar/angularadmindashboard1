import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Diploma } from 'src/app/models/Diploma';
import { Employe } from 'src/app/models/Employe';
import { DiplomaService } from 'src/app/services/diplome.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-details-diplome',
  templateUrl: './details-diplome.component.html',
  styleUrls: ['./details-diplome.component.css'],
})
export class DetailsDiplomeComponent implements OnInit {
  @Input() currentEmployee: Employe;

  diploma: any;
  diplome: Diploma;

  adddimplome = false;

  fileToUploaddiplomefile: File[] = [];

  shortLinkdiplomefile$: any = [];

  diploms$: any[] = [];

  isupdatedfailed = false;
  isaddedfailed = false;
  submitted = false;
  deleted = false;
  isdeletedfailed = false;
  errorMessage = '';

  constructor(
    private diplomeService: DiplomaService,
    private fileUploadService: FileUploadService
  ) {}

  async ngOnInit() {
    for (
      let i = 0;
      i < this.currentEmployee['employeeDiplomaList'].length;
      i++
    ) {
      let id = this.currentEmployee['employeeDiplomaList'][i];
      await this.getdiplomss(id['id'], i);
    }
  }
  async getDiplomeById(id: any, i: any) {
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

  updatediplom(id: any, i: any): void {
    // romove displayed data in console & add id
    console.log('test ');
    console.log(i);
    console.log(id);
    console.log(this.diploms$);
    this.diplomeService.update(id, i).subscribe({
      next: (res: any) => {
        console.log(res);
        this.submitted = true;
        window.location.reload();
      },
      error: (e: any) => {
        console.error(e);
        this.errorMessage = e.error.message;
        this.isupdatedfailed = true;
      },
    });
  }

  async getdiplomss(id: any, x: any): Promise<any> {
    await this.diplomeService.getByRelationEmpId(id).subscribe((data: {}) => {
      this.diploms$[x] = data;
      console.log(this.diploms$[x]);
    });
  }

  deletediplom(id: any) {
    this.diplomeService.delete(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.deleted = true;
      },
      error: (err) => {
        console.log('deleting Dipl failed ');
        this.errorMessage = err.error.message;
        this.isdeletedfailed = true;
      },
    });
  }

  resetshortlinks() {
    console.log('reseting short links ');

    this.shortLinkdiplomefile$ = [];
  }
}
