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
import { MatTableModule ,MatTableDataSource} from '@angular/material/table'
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';

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

  ],
  providers: [Constants,AuthService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
