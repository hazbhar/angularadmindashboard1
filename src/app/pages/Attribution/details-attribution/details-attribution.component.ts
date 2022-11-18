import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Attribution } from 'src/app/models/Attribution';
import { Employe } from 'src/app/models/Employe';
import { AttributionService } from 'src/app/services/attribution.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-details-attribution',
  templateUrl: './details-attribution.component.html',
  styleUrls: ['./details-attribution.component.css']
})
export class DetailsAttributionComponent implements OnInit {
@Input() currentEmployee:Employe;

isupdatedfailed = false;
isaddedfailed = false;
submitted = false;
deleted = false;
isdeletedfailed = false;

errorMessage = '';
message = '';

addatrribution = false;

AttributionForm!: FormGroup;



fileToUploadAttributionf: File[] = [];

shortLinkAttributionf$: any = [];

Attributions$: Attribution[] = [];

  constructor(private attributionService: AttributionService,private fileUploadService: FileUploadService,private formBuilder: FormBuilder) { }

  async ngOnInit() {


    for (
      let i = 0;
      i < this.currentEmployee['employeeAttributionList'].length;
      i++
    ) {
      let id = this.currentEmployee['employeeAttributionList'][i];
     await this.getAttributions(id['id'], i);
    }
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




  async getAttributions(id: any, x: any) {
    this.attributionService.getByRelationEmpId(id).subscribe((data: Attribution) => {
      this.Attributions$[x] = data;
      console.log(this.Attributions$[x]);
    });
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
