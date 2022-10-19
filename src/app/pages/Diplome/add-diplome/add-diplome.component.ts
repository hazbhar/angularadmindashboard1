import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AttributionService } from 'src/app/services/attribution.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

import { Diploma } from '../../../models/Diploma';
import { DiplomaService } from '../../../services/diplome.service';

@Component({
  selector: 'app-add-diplome',
  templateUrl: './add-diplome.component.html',
  styleUrls: ['./add-diplome.component.css'],
})
export class AddDiplomeComponent implements OnInit {
  diplome: Diploma;
  Infosdesdiplomes!: FormGroup;
  diplitems!: FormArray;
  submitted = false;
  empid:number=0;
  errorMessage: any;
  isaddedfailed: any;

  fileToUploadAttributionf: File[] = [];
  fileToUploaddiplomefile: File[] = [];

  shortLinkdiplomefile$: any = [];
  shortLinkAttributionf$: any = [];

  constructor(private diplomeService: DiplomaService,    private fileUploadService: FileUploadService,    private formBuilder: FormBuilder ,private attributionService :AttributionService ) {}

  ngOnInit(): void {
    this.Infosdesdiplomes = this.formBuilder.group({
      diploma: new FormArray([]),
    });
    this.addnewdipl();
  }

/**
 * from arrays that possible to be multiple
 */

  addDiplome(): void {
    const data = {
      title: this.diplome.title,
      speciality: this.diplome.speciality,
      dateObtained: this.diplome.dateObtained,
    };

    this.diplomeService.create(data, 1).subscribe({
      next: (res: any) => {
        //To do (remove data displayed in console)
        console.log(res);
        this.submitted = true;
      },
      error: (e: any) => console.error(e),
    });
  }

  addnewdipl() {
    this.diplitems = this.Infosdesdiplomes.get('diploma') as FormArray;
    this.diplitems.push(this.gennewdipl());
  }
/**
   * function to delete new form group diplome from the form array
   */
  delnewdipl(index: any) {
    this.diplitems = this.Infosdesdiplomes.get('diploma') as FormArray;
    this.diplitems.removeAt(index);
  }
/**
   * function to generate new form group diplome before adding it to the form array
   */
  gennewdipl(): FormGroup {
    return new FormGroup({
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
  handleFileInputAttributionf(event: any) {
    this.fileToUploadAttributionf.push(<File>event.target.files[0]);
  }

  get Infosdesdiplome() {
    return this.Infosdesdiplomes.controls;
  }
  get diploma() {
    return this.Infosdesdiplomes.get('diploma') as FormArray;
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
  savediplom(){
    this.uploaddiplomefile(this.fileToUploaddiplomefile);
    this.uploadAttributionf(this.fileToUploadAttributionf);


    const diplo={
      employee: null,
      diploma: {
        title: this.diploma.value.title,
        speciality: this.diploma.value.specialite,
        dateObtained: null,
        attacheDocsList: this.shortLinkdiplomefile$,
      },
    };
    const attribu={
      title: this.diploma.value.attribution,
      dateAttribution: null,
      attacheDocsList: this.shortLinkAttributionf$,
    };

    this.diplomeService.create(diplo,this.empid
    )
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

    this.attributionService.create(attribu,this.empid).subscribe({
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
}
