import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Diploma } from 'src/app/models/Diploma';
import { Formation } from 'src/app/models/Formation';
import { DiplomaService } from 'src/app/services/diplome.service';

@Component({
  selector: 'app-list-diplomes',
  templateUrl: './list-diplomes.component.html',
  styleUrls: ['./list-diplomes.component.css']
})
export class ListDiplomesComponent implements OnInit {
  displayedColumns: string[] = ['title','speciality','Edit','Delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<any>;
  constructor(private diplomaService:  DiplomaService) { }
  diploms?: Diploma[];
  currentdiplom:Diploma;
  deleted=false;
  isdeletedfailed=false;
  errorMessage="";
  currentIndex = -1;
  ngOnInit(): void {
    this.getdiploms();
    this.ngAfterViewInit();
     // Assign the data to the data source for the table to render
     console.log("this.dataSource")
     console.log(this.dataSource)
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
  getdiploms(): any {
    this.diplomaService.getAll().subscribe(
      (data: any) => {
        this.diploms = data;
        this.dataSource = new MatTableDataSource(data)
        console.log(this.dataSource)
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  deletediplom(id: any): void {
    // this.formationService.get(1);
    this.diplomaService.delete(id).subscribe({
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
  setActivediplom(diplom: Diploma, index: number): void {
    this.currentdiplom = diplom;
    this.currentIndex = index;
  }
}
