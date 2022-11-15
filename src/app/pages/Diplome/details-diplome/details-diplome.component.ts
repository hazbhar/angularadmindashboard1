import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Diploma } from 'src/app/models/Diploma';
import { DiplomaService } from 'src/app/services/diplome.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-details-diplome',
  templateUrl: './details-diplome.component.html',
  styleUrls: ['./details-diplome.component.css']
})
export class DetailsDiplomeComponent implements OnInit {
@Input() currentEmployee:any

diploma: any;
diplome: Diploma;

adddimplome = false;

Infosdesdiplomes!: FormGroup;

diplitems!: FormArray;

fileToUploaddiplomefile: File[] = [];

shortLinkdiplomefile$: any = [];

diploms$: any[] = [];

isupdatedfailed = false;
isaddedfailed = false;
submitted = false;
deleted = false;
isdeletedfailed = false;
errorMessage = '';

  constructor(private diplomeService: DiplomaService, private fileUploadService: FileUploadService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    for (
      let i = 0;
      i < this.currentEmployee['employeeDiplomaList'].length;
      i++
    ) {
      let id = this.currentEmployee['employeeDiplomaList'][i];
      this.getdiplomss(id['id'], i);
    }

    this.Infosdesdiplomes = this.formBuilder.group({
      diplom: new FormArray([]),
    });
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



  getdiplomss(id: any, x: any): any {
    this.diplomeService.getByRelationEmpId(id).subscribe((data: {}) => {
      this.diploms$[x] = data;
      console.log(this.diploms$[x]);
    });
  }

  get Infosdesdiplome() {
    return this.Infosdesdiplomes.controls;
  }
  get diplom() {
    return this.Infosdesdiplomes.get('diplom') as FormArray;
  }

    /**
   * function to add new form group diplome in the form array
   */
     addnewdipl() {
      this.diplitems = this.Infosdesdiplomes.get('diplom') as FormArray;
      this.diplitems.push(this.gennewdipl());
      this.adddimplome = true;
    }
    /**
     * function to delete new form group diplome from the form array
     */
    delnewdipl(index: any) {
      this.diplitems = this.Infosdesdiplomes.get('diplom') as FormArray;
      this.diplitems.removeAt(index);
      this.adddimplome = false;
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


  savediplom() {
    this.uploaddiplomefile(this.fileToUploaddiplomefile);

    const diplo = {
      title: this.diplom.value[0].title,
      speciality: this.diplom.value[0].specialite,
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
