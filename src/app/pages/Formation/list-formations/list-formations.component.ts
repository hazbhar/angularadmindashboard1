import { FormationService } from './../../../services/formation.service';
import { Formation } from './../../../models/Formation';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-formations',
  templateUrl: './list-formations.component.html',
  styleUrls: ['./list-formations.component.css'],
})
export class ListFormationsComponent implements OnInit {

  displayedColumns: string[] = ['title', 'description','Edit','Delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<any>;

  formations?: Formation[];
  currentformation: Formation = {
    id: 0,
    title: undefined,
    description: undefined,
    periodec: undefined,
    enabled: undefined,
    employeeFormationList: undefined,
    habilitationList: undefined,
    attachedDocsList: undefined,
  };

  deleted=false;
  isdeletedfailed=false;
  errorMessage="";
  currentIndex = -1;
  constructor(private formationService: FormationService) {

  }

  ngOnInit(): void {
    this.getFormations();
    this.ngAfterViewInit() ;

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getFormations(): any {
    this.formationService.getAll().subscribe(
      (data: any) => {
        this.formations = data;
        this.dataSource=data;
        console.log(this.dataSource)
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
  setActiveForma(formation: Formation, index: number): void {
    this.currentformation = formation;
    this.currentIndex = index;
  }
}
