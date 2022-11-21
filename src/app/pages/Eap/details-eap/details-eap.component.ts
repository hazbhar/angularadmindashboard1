import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Eap } from 'src/app/models/Eap';
import { Employe } from 'src/app/models/Employe';
import { EapService } from 'src/app/services/eap.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-details-eap',
  templateUrl: './details-eap.component.html',
  styleUrls: ['./details-eap.component.css']
})
export class DetailsEapComponent implements OnInit {
@Input() currentEmployee:Employe

addEap = false;

errorMessage = '';

eaplist$: Eap[] = [];

  constructor(private eapService: EapService) { }

  async ngOnInit() {

    for (let i = 0; i < this.currentEmployee['eapList'].length; i++) {
      let id = this.currentEmployee['eapList'][i];
      await this.getEaps(id['id'], i);
    }

  }



  async getEaps(id: any, x: any) {
   await this.eapService.get(id).toPromise()
   .then((data : any) => {
    this.eaplist$[x] = data;
      console.log(this.eaplist$[x]);
   })
   .catch((error) => {
     this.errorMessage = error.message;
   });

  }

}
