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

addatrribution = false;

Attributions$: Attribution[] = [];

  constructor(private attributionService: AttributionService) { }

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



  async getAttributions(id: any, x: any) {
    this.attributionService.getByRelationEmpId(id).subscribe((data: Attribution) => {
      this.Attributions$[x] = data;
      console.log(this.Attributions$[x]);
    });
  }




}
