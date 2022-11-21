import { Component, Input, OnInit } from '@angular/core';
import { Diploma } from 'src/app/models/Diploma';
import { DiplomaService } from 'src/app/services/diplome.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-details-update-diplome',
  templateUrl: './details-update-diplome.component.html',
  styleUrls: ['./details-update-diplome.component.css']
})
export class DetailsUpdateDiplomeComponent implements OnInit {
  @Input() element:Diploma

  fileToUploaddiplomefile: File[] = [];

  shortLinkdiplomefile$: any = [];


  isupdatedfailed = false;
  isaddedfailed = false;
  submitted = false;
  deleted = false;
  isdeletedfailed = false;
  errorMessage = '';

  constructor( private diplomeService: DiplomaService,
    private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
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
