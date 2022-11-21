import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Attribution } from 'src/app/models/Attribution';
import { AttributionService } from 'src/app/services/attribution.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-details-update-attribution',
  templateUrl: './details-update-attribution.component.html',
  styleUrls: ['./details-update-attribution.component.css']
})
export class DetailsUpdateAttributionComponent implements OnInit {
  @Input() element:Attribution
  isupdatedfailed = false;
  isaddedfailed = false;
  submitted = false;
  deleted = false;
  isdeletedfailed = false;

  errorMessage = '';
  message = '';


  fileToUploadAttributionf: File[] = [];

  shortLinkAttributionf$: any = [];
  constructor(private attributionService: AttributionService,private fileUploadService: FileUploadService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
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




  async updateAttribution(id: any, i: any): Promise<void> {
    this.message = '';

     this.attributionService.update(id, i).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : 'This attribution was updated successfully!';
          window.location.reload();
      },
      error: (e) => console.error(e),
    });
  }





  async delAttribu(id: any) {
    this.attributionService.delete(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.deleted = true;
        window.location.reload();
      },
      error: (err) => {
        console.log('deleting Attribution failed ');
        this.errorMessage = err.error.message;
        this.isdeletedfailed = true;
      },
    });
  }

  resetshortlinks() {
    console.log('reseting short links ');

    this.shortLinkAttributionf$ = [];

  }
}
