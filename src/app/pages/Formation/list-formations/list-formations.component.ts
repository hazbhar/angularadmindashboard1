import { FormationService } from './../../../services/formation.service';
import { Formation } from './../../../models/Formation';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StorageService } from 'src/app/services/storage.service';
import { Observable } from 'rxjs';

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

   test: any[]=[];
  formation:any;
  emp:any
  deleted=false;
  isdeletedfailed=false;
  errorMessage="";
  currentIndex = -1;
  formalength: any;
  constructor(private formationService: FormationService,private storageService: StorageService) {

  }

  ngOnInit(): void {
    this.emp=this.storageService.getEmp();
    console.log(this.emp);
    //listidattr
    for(let i=0;i<this.emp['employeeFormationList'].length;i++){
      console.log(this.emp['employeeFormationList'][i])
      let id=this.emp['employeeFormationList'][i]
      this.getFormations(id['id'],i)}

    console.log("this.currentFormation");



  }


  getFormations(id:any,x:any): any {

    this.formationService.get(id).subscribe(
      (data: any) => {

       this.test[x]=(data)
        console.log("this.currentFormation");
        console.log(data)
        console.log(this.test)
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
