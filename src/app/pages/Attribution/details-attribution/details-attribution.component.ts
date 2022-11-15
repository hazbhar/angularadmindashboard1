import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Attribution } from 'src/app/models/Attribution';
import { AttributionService } from 'src/app/services/attribution.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-details-attribution',
  templateUrl: './details-attribution.component.html',
  styleUrls: ['./details-attribution.component.css']
})
export class DetailsAttributionComponent implements OnInit {
@Input() currentEmployee:any;

isupdatedfailed = false;
isaddedfailed = false;
submitted = false;
deleted = false;
isdeletedfailed = false;

errorMessage = '';
message = '';

addatrribution = false;

AttributionForm!: FormGroup;

Attributionitems!: FormArray;

fileToUploadAttributionf: File[] = [];

shortLinkAttributionf$: any = [];

Attributions$: Attribution[] = [];

  constructor(private attributionService: AttributionService,private fileUploadService: FileUploadService,private formBuilder: FormBuilder) { }

  async ngOnInit(): Promise<void> {
    this.AttributionForm = this.formBuilder.group({
      attributfrm: new FormArray([]),
    });

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


  get infodesAttribution() {
    return this.AttributionForm.controls;
  }
  get AttributionsContr() {
    return this.AttributionForm.get('attributfrm') as FormArray;
  }

  /**
   * function to add new form group Attribution in the form array
   */
   addnewAttribu() {
    this.Attributionitems = this.AttributionForm.get(
      'attributfrm'
    ) as FormArray;
    this.Attributionitems.push(this.gennewAttribu());
    this.addatrribution = true;
  }
  /**
   * function to add new form group Attribution in the form array
   */
  delnewAttribu(index: any) {
    this.Attributionitems = this.AttributionForm.get(
      'attributfrm'
    ) as FormArray;
    this.Attributionitems.removeAt(index);
    this.addatrribution = false;
  }
  /**
   * function to generate new form group Attribution before adding it to the form array
   */
  gennewAttribu(): FormGroup {
    return new FormGroup({
      title: new FormControl('', Validators.required),
      attribfile: new FormControl('', Validators.required),
    });
  }


  async getAttributions(id: any, x: any) {
    this.attributionService.getByRelationEmpId(id).subscribe((data: Attribution) => {
      this.Attributions$[x] = data;
      console.log(this.Attributions$[x]);
    });
  }

  updateAttribution(id: any, i: any): void {
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


  saveAttribution() {
    this.uploadAttributionf(this.fileToUploadAttributionf);

    const attribu = {
      title: this.AttributionsContr.value[0].title,
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
          console.log('adding Employee failed ');
          this.errorMessage = err.error.message;
          this.isaddedfailed = true;
        },
      });
  }


  delAttribu(id: any) {
    this.attributionService.delete(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.deleted = true;
        window.location.reload();
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

    this.shortLinkAttributionf$ = [];

  }


}
