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
import { HttpClientModule } from "@angular/common/http";
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
    DetailsUserComponent,
    ListUserComponent,
    AddUserComponent,
    AddEmployeComponent,
    DetailsEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [Constants,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
