import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Eap } from 'src/app/models/Eap';
import { EapService } from 'src/app/services/eap.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-details-update-eap',
  templateUrl: './details-update-eap.component.html',
  styleUrls: ['./details-update-eap.component.css']
})
export class DetailsUpdateEapComponent implements OnInit {
  @Input() element : Eap
  datePipe = new DatePipe('en-US');


  isupdatedfailed = false;
  isaddedfailed = false;
  submitted = false;
  deleted = false;
  isdeletedfailed = false;
  isdeleted=false
  errorMessage = '';
  message = '';


  EapFrm!: FormGroup;



  shortLinkeapf$: any;

  fileToUploadeap: File;

  constructor(private eapService: EapService,private fileUploadService: FileUploadService,public datepipe: DatePipe, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  async uploadeapf(fil: File) {
    const formData = new FormData();
    formData.append('document', fil);
    await this.fileUploadService
      .upload(formData)

  }


  handleFileInputeap(event: any) {
    this.fileToUploadeap = <File>event.target.files[0];
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

 async updateEap(eap: any) {
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


  resetshortlinks() {
    console.log('reseting short links ');

    this.shortLinkeapf$ = [];
  }
}
