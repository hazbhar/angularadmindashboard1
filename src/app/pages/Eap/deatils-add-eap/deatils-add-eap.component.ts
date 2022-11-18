import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Employe } from 'src/app/models/Employe';
import { EapService } from 'src/app/services/eap.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-deatils-add-eap',
  templateUrl: './deatils-add-eap.component.html',
  styleUrls: ['./deatils-add-eap.component.css']
})
export class DeatilsAddEapComponent implements OnInit {
  @Input() currentEmployee:Employe

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



  shortLinkeapf$: any;

  fileToUploadeap: File;
  constructor(private eapService: EapService,private fileUploadService: FileUploadService,public datepipe: DatePipe, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.EapFrm = this.formBuilder.group({
      eap: new FormControl('', Validators.required),
        dateEap: new FormControl(''),
      });

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

  async saveEap() {
    this.uploadeapf(this.fileToUploadeap);
    const Eap = {
      description: 'test',
      dateEap:
        this.EapFrm.value.dateEap,
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
