import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import {AddEmployeeComponent} from "./pages/employee/add-employee/add-employee.component";
import {ListEmployeeComponent} from "./pages/employee/list-employee/list-employee.component";
import { ListUserComponent } from './pages/User/list-user/list-user.component';
import { DetailsUserComponent } from './pages/User/details-user/details-user.component';
import { AddUserComponent } from './pages/User/add-user/add-user.component';
import {DetailsEmployeeComponent} from "./pages/employee/details-employee/details-employee.component";
import { AddEmployeComponent } from './pages/Employe/add-employe/add-employe.component';
import { DetailsEmployeComponent } from './pages/Employe/details-employe/details-employe.component';
import { ListEmployeComponent } from './pages/Employe/list-employe/list-employe.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },

  { path: 'pages-blank', component: PagesBlankComponent },

  { path: 'pages-error404', component: PagesError404Component },

  { path: 'pages-login', component: PagesLoginComponent },

  { path: 'user-profile', component: UsersProfileComponent },
  { path: 'listusers', component: ListUserComponent },
  { path: 'userdetails/:id', component: DetailsUserComponent },
  { path: 'adduser', component: AddUserComponent },
  { path: 'employee-add', component: AddEmployeeComponent },
  { path: 'employee-list', component: ListEmployeeComponent },
  { path: 'employee-details/:id', component: DetailsEmployeeComponent },

  { path: 'addemploye', component: AddEmployeComponent },
  { path: 'employedetails/:id', component: DetailsEmployeComponent },
  { path: 'listemployes', component: ListEmployeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
