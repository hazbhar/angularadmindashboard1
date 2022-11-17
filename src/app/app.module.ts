import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { UsersProfileComponent } from './pages/users-profile/users-profile.component';

import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';

import { AddFormationComponent } from './pages/Formation/add-formation/add-formation.component';
import { EditFormationComponent } from './pages/Formation/edit-formation/edit-formation.component';
import { ListFormationsComponent } from './pages/Formation/list-formations/list-formations.component';
import { DetailsFormationComponent } from './pages/Formation/details-formation/details-formation.component';
import { HttpClientModule } from "@angular/common/http";


import { DetailsDiplomeComponent } from './pages/Diplome/details-diplome/details-diplome.component';
import { ListDiplomesComponent } from './pages/Diplome/list-diplomes/list-diplomes.component';
import { AddDiplomeComponent } from './pages/Diplome/add-diplome/add-diplome.component';
import { EditDiplomeComponent } from './pages/Diplome/edit-diplome/edit-diplome.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Constants } from './config/constant';
import { DetailsUserComponent } from './pages/User/details-user/details-user.component';
import { ListUserComponent } from './pages/User/list-user/list-user.component';
import { AddUserComponent } from './pages/User/add-user/add-user.component';
import { AuthService } from './services/auth.service';
import { AddEmployeComponent } from './pages/Employe/add-employe/add-employe.component';
import { ListEmployeeComponent } from './pages/Employe/list-employe/list-employee.component';
import { DetailsEmployeeComponent } from './pages/Employe/details-employe/details-employee.component';
import { AddContratComponent } from './pages/Contrat/add-contrat/add-contrat.component';
import { ListContratComponent } from './pages/Contrat/list-contrat/list-contrat.component';
import { EditContratComponent } from './pages/Contrat/edit-contrat/edit-contrat.component';
import { DashbordEmpComponent } from './pages/dashbord-emp/dashbord-emp.component';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTableModule} from '@angular/material/table'
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { DetailsContratComponent } from './pages/Contrat/details-contrat/details-contrat.component';
import { EditUserComponent } from './pages/User/edit-user/edit-user.component';
import { DetailsAttributionComponent } from './pages/Attribution/details-attribution/details-attribution.component';
import { DetailsVisitMedComponent } from './pages/VisiteMedicale/details-visit-med/details-visit-med.component';
import { DetailsEapComponent } from './pages/Eap/details-eap/details-eap.component';
import { DeatilsAddEapComponent } from './pages/Eap/deatils-add-eap/deatils-add-eap.component';
import { DeatilsAddFormationComponent } from './pages/Formation/deatils-add-formation/deatils-add-formation.component';
import { DeatilsAddAttributionComponent } from './pages/Attribution/deatils-add-attribution/deatils-add-attribution.component';
import { DeatilsAddContratComponent } from './pages/Contrat/deatils-add-contrat/deatils-add-contrat.component';
import { DetailsAddVisitMedicaleComponent } from './pages/VisiteMedicale/details-add-visit-medicale/details-add-visit-medicale.component';
import { DetailsAddDiplomeComponent } from './pages/Diplome/details-add-diplome/details-add-diplome.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgSelectModule } from '@ng-select/ng-select';
import { authInterceptorProviders } from './helpers/auth.interceptors';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    UsersProfileComponent,
    PagesLoginComponent,
    PagesError404Component,
    PagesBlankComponent,
    ListEmployeeComponent,
    AddFormationComponent,
    DetailsFormationComponent,
    EditFormationComponent,
    ListFormationsComponent,
    DetailsDiplomeComponent,
    ListDiplomesComponent,
    AddDiplomeComponent,
    EditDiplomeComponent,
    DetailsUserComponent,
    ListUserComponent,
    AddUserComponent,
    AddEmployeComponent,
    DetailsEmployeeComponent,
    AddContratComponent,
    ListContratComponent,
    EditContratComponent,
    DashbordEmpComponent,
    DetailsContratComponent,
    EditUserComponent,
    DetailsAttributionComponent,
    DetailsVisitMedComponent,
    DetailsEapComponent,
    DeatilsAddEapComponent,
    DeatilsAddFormationComponent,
    DeatilsAddAttributionComponent,
    DeatilsAddContratComponent,
    DetailsAddVisitMedicaleComponent,
    DetailsAddDiplomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    NgxPaginationModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    NgSelectModule
  ],
  providers: [authInterceptorProviders,Constants,AuthService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
