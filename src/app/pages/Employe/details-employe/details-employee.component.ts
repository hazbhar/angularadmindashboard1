import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from '../../../services/employe.service';
import { CivilState } from 'src/app/models/CivilState';
import { Process } from 'src/app/models/Process';
import { Service } from 'src/app/models/Service';
import { Site } from 'src/app/models/Site';
import { TypeOfStaff } from 'src/app/models/TypeOfStaff';
import { EtatcivilService } from 'src/app/services/etatcivil.service';
import { ProcessService } from 'src/app/services/process.service';
import { ServiceService } from 'src/app/services/service.service';
import { SiteService } from 'src/app/services/site.service';
import { TypepersonnelService } from 'src/app/services/typepersonnel.service';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatToolbar } from '@angular/material/toolbar';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

animations: [
  trigger('detailExpand', [
    state('collapsed', style({ height: '0px', minHeight: '0' })),
    state('expanded', style({ height: '*' })),
    transition(
      'expanded <=> collapsed',
      animate('225ms cubicbezier(0.4, 0.0, 0.2, 1)')
    ),
  ]),
];
@Component({
  selector: 'app-details-employee',
  templateUrl: './details-employee.component.html',
  styleUrls: ['./details-employee.component.css'],
})
export class DetailsEmployeeComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  toolbar!: MatToolbar;
  isChecked = true;
  page: any = 'Info';
  isupdatedfailed = false;
  isaddedfailed = false;
  submitted = false;
  deleted = false;
  isdeletedfailed = false;
  errorMessage = '';

  etatcivil$!: CivilState[];
  site$!: Site[];
  typeperso$!: TypeOfStaff[];
  unitetech$!: Service[];
  typprocesus$!: Process[];

  /**
   * variables to register from forms to test their values
   */

  siteid: any;
  typePersonnel: any;
  typeProcessus: any;

  currentEmployee$: any=undefined;

  constructor(
    private observer: BreakpointObserver,
    private employeeService: EmployeService,
    private typrocesService: ProcessService,
    private unitetechservice: ServiceService,
    private siteService: SiteService,
    private typepersoService: TypepersonnelService,
    private router: Router,
    private route: ActivatedRoute,
    private etatcivilService: EtatcivilService,


  ) {
    this.getEmployee(this.route.snapshot.params['id']);

    /*
     * consum api and collect data from data base
     */
    this.retrieveunitetech();
    this.retrievetypprocesus();

    this.retrievesites();
    this.retrievetypeperso();
    this.retrieveetacivil();

  }

  async ngOnInit(): Promise<void> {

    /**
     * open employee menu
     */
    this.sidenav.open();
  }
  /**
   * config responsive employee menu
   */
  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
  async getEmployee(id: string): Promise<void> {
    this.employeeService.get(id).subscribe({
      next:(data: any) =>{
      this.currentEmployee$ = data;
      console.log("this.currentEmployee$");
      console.log(this.currentEmployee$);
    },
    error : (er)=>{
      console.log("error getting employee");
      this.router.navigate(['/pages-error404', { }]);}
    });
  }

  /**
   * specify pages
   */
  openPage(pg: any) {
    this.page = pg;
  }

  /**
   * consuming api functions
   */
  retrievesites(): void {
    this.siteService.getAll().subscribe({
      next: (data: any) => {
        this.site$ = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }


  retrieveetacivil(): void {
    this.etatcivilService.getAll().subscribe({
      next: (data: any) => {
        this.etatcivil$ = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  retrievetypeperso(): void {
    this.typepersoService.getAll().subscribe({
      next: (data: any) => {
        this.typeperso$ = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  retrieveunitetech(): void {
    this.unitetechservice.getAll().subscribe({
      next: (data: any) => {
        this.unitetech$ = data;
        console.log(data);
        console.log('unitetech');
      },
      error: (e) => console.error(e),
    });
  }
  retrievetypprocesus(): void {
    this.typrocesService.getAll().subscribe({
      next: (data: any) => {
        this.typprocesus$ = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  checktypprocess(id:any){

      for(let procesemp of this.currentEmployee$.processList){

        if(procesemp.id==id)return true
      }
      return false
  }

  editEmp() {window.location.reload();}


}
