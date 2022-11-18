import { FormationService } from './../../../services/formation.service';
import { Formation } from './../../../models/Formation';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-list-formations',
  templateUrl: './list-formations.component.html',
  styleUrls: ['./list-formations.component.css'],
})
export class ListFormationsComponent implements OnInit {
  perpage:any;
  page=1;
  totalpag:any
  itemsPerPage:any;
  totalItems:any
  listitemperpage=[5,10,25]
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() currentFormation?: Formation[] ;

   test: any;
  deleted=false;
  isdeletedfailed=false;
  errorMessage="";

  constructor(private formationService: FormationService,private storageService: StorageService) {

  }

 async ngOnInit() {

    //listidattr

     await this.getFormations()

  }


 async getFormations() {

    await this.formationService.getAll().subscribe(
      (data: {}) => {
       this.test=data

      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  deleteFormation(id: number): void {
    // this.formationService.get(1);
    this.formationService.delete(id).subscribe({
      next: (res) => {
        this.deleted=true;
        console.log(res);
      },
      error: (e) => {
        this.isdeletedfailed=true;
        this.errorMessage=e.message;
        console.error(e)},
    });
  }

}
