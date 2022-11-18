import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Employe } from 'src/app/models/Employe';
import { DiplomaService } from 'src/app/services/diplome.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-details-add-diplome',
  templateUrl: './details-add-diplome.component.html',
  styleUrls: ['./details-add-diplome.component.css']
})
export class DetailsAddDiplomeComponent implements OnInit {
  @Input() currentEmployee:Employe
  fileToUploaddiplomefile: File[] = [];

  shortLinkdiplomefile$: any = [];

  isupdatedfailed = false;
isaddedfailed = false;
submitted = false;
deleted = false;
isdeletedfailed = false;
errorMessage = '';
Infosdesdiplomes: FormGroup;

  constructor(private diplomeService: DiplomaService, private fileUploadService: FileUploadService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {

    this.Infosdesdiplomes = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      specialite: new FormControl('', Validators.required),
      diplomefile: new FormControl('', Validators.required),
      attribution: new FormControl(''),
      Attributionf: new FormControl(''),
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


  async savediplom() {
    await this.uploaddiplomefile(this.fileToUploaddiplomefile);

    const diplo = {
      title: this.Infosdesdiplomes.value.title,
      speciality: this.Infosdesdiplomes.value.specialite,
      dateObtained: null,
      attacheDocsList: this.shortLinkdiplomefile$,
    };

    console.log(diplo);

    this.diplomeService.create(diplo, this.currentEmployee.id).subscribe({
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
  resetshortlinks() {
    console.log('reseting short links ');

    this.shortLinkdiplomefile$ = [];

  }


}
