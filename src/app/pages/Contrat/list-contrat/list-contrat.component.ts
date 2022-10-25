import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Contract } from 'src/app/models/Contract';
import { typeContrat } from 'src/app/models/TypeContrat';
import { ContratService } from 'src/app/services/contrat.service';
import { TypecontratService } from 'src/app/services/typecontrat.service';

@Component({
  selector: 'app-list-contrat',
  templateUrl: './list-contrat.component.html',
  styleUrls: ['./list-contrat.component.css']
})
export class ListContratComponent implements OnInit {
  displayedColumns: string[] = ['contractType', 'startDate', 'endDate','Edit','Delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<any>;

  contratList:Contract[] = [];
  typecontrat$!: typeContrat[];

  currentContrat:Contract;
  isdeleted=false;
  isdeletedfailed=false;
  errorMessage="";
  currentIndex = -1;
  constructor(private contratService: ContratService,private typcontratService: TypecontratService) { }

  ngOnInit(): void {
    this.getcontrats();
    this.ngAfterViewInit();
    this. retrievetypecontrats();
    // Assign the data to the data source for the table to render
    console.log("this.dataSource")
    console.log(this.dataSource)
 }
 retrievetypecontrats(): void {
  this.typcontratService.getAll().subscribe({
    next: (data: any) => {
      this.typecontrat$ = data;
      console.log(data);
    },
    error: (e) => console.error(e),
  });
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
  getcontrats(): any {
    this.contratService.getAll().subscribe(
      (data: any) => {
        this.contratList = data;
        this.dataSource = new MatTableDataSource(data);
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  deletecontrat(id: any): void {
    // this.formationService.get(1);
    this.contratService.delete(id).subscribe({
      next: (res) => {
        this.isdeleted=true;
        console.log(res);
      },
      error: (e) => {
        this.isdeletedfailed=true;
        this.errorMessage=e.message;
        console.error(e)},
    });
  }
  setActivecontrat(contrat: Contract, index: number): void {
    this.currentContrat = contrat;
    this.currentIndex = index;
  }
}
