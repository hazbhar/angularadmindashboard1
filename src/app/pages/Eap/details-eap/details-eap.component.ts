import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Eap } from 'src/app/models/Eap';
import { EapService } from 'src/app/services/eap.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-details-eap',
  templateUrl: './details-eap.component.html',
  styleUrls: ['./details-eap.component.css']
})
export class DetailsEapComponent implements OnInit {
@Input() currentEmployee:any

datePipe = new DatePipe('en-US');


isupdatedfailed = false;
isaddedfailed = false;
submitted = false;
deleted = false;
isdeletedfailed = false;
isdeleted=false
errorMessage = '';
message = '';

addEap = false;

EapFrm!: FormGroup;

Eapitems!: FormArray;

shortLinkeapf$: any;

fileToUploadeap: File;

eaplist$: Eap[] = [];

  constructor(private eapService: EapService,private fileUploadService: FileUploadService,public datepipe: DatePipe, private formBuilder: FormBuilder) { }

  async ngOnInit() {
    this.EapFrm = this.formBuilder.group({
      eapfr: new FormArray([]),
    });

    for (let i = 0; i < this.currentEmployee['eapList'].length; i++) {
      let id = this.currentEmployee['eapList'][i];
      await this.getEaps(id['id'], i);
    }

  }

  async uploadeapf(fil: File) {
    const formData = new FormData();
    formData.append('document', fil);
    await this.fileUploadService
      .upload(formData)
      .toPromise()
      .then((res) => {
        this.shortLinkeapf$ = res;
      })
      .catch((error) => {
        this.errorMessage = error.message;
        this.isaddedfailed = true;
      });
  }


  handleFileInputeap(event: any) {
    this.fileToUploadeap = <File>event.target.files[0];
  }


  async getEaps(id: any, x: any) {
    this.eapService.get(id).subscribe((data: Eap) => {
      this.eaplist$[x] = data;
      console.log(this.eaplist$[x]);
    });
  }
  deleteEap(id:any){
    this.eapService.delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : 'This eap was deleted successfully!';
          this.isdeleted=true;
      },
      error: (e) => {console.error(e);
        this.isdeletedfailed=true;
      }
    });
  }
  updateEap(eap: any) {
    this.message = '';
    console.log(eap)
    eap.dateEap = eap.dateEap;
    this.eapService.update(eap.id, eap).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : 'This eap was updated successfully!';
          window.location.reload();
      },
      error: (e) => console.error(e),
    });
  }


  get infodesEap() {
    return this.EapFrm.controls;
  }
  get Eaps() {
    return this.EapFrm.get('eapfr') as FormArray;
  }


    /**
   * function to add new form group Eap in the form array
   */
     addnewEap() {
      this.Eapitems = this.EapFrm.get('eapfr') as FormArray;
      this.Eapitems.push(this.gennewEap());
      this.addEap = true;
    }
    /**
     * function to add new form group Eap in the form array
     */
    delnewEap(index: any) {
      this.Eapitems = this.EapFrm.get('eapfr') as FormArray;
      this.Eapitems.removeAt(index);
      this.addEap = false;
    }
    /**
     * function to generate new form group Eap before adding it to the form array
     */
    gennewEap(): FormGroup {
      return new FormGroup({
        eap: new FormControl('', Validators.required),
        dateEap: new FormControl(''),
      });
    }

    saveEap() {
      this.uploadeapf(this.fileToUploadeap);
      const Eap = {
        description: 'test',
        dateEap: this.datePipe.transform(
          this.Eaps.value[0].dateEap,
          'dd-MM-yyyy'
        ),
        employee: {
          id: Number(this.currentEmployee.id),
        },
        attachedDocsList: [
          {
            urlFile: this.shortLinkeapf$,
          },
        ],
      };
      console.log(Eap);

      this.eapService.create(Eap).subscribe({
        next: (res: any) => {
          console.log(res);
          this.submitted = true;
        },
        error: (err) => {
          console.log('adding Eap failed ');
          this.errorMessage = err.error.message;
          this.isaddedfailed = true;
        },
      });
      this.shortLinkeapf$ = [];
    }
  resetshortlinks() {
    console.log('reseting short links ');

    this.shortLinkeapf$ = [];
  }
}
