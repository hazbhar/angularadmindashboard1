import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import {ListEmployeeComponent} from "./pages/Employe/list-employe/list-employee.component";

import { AddFormationComponent } from './pages/Formation/add-formation/add-formation.component';
import { EditFormationComponent } from './pages/Formation/edit-formation/edit-formation.component';
import { ListFormationsComponent } from './pages/Formation/list-formations/list-formations.component';
import { DetailsFormationComponent } from './pages/Formation/details-formation/details-formation.component';

import { ListUserComponent } from './pages/User/list-user/list-user.component';
import { DetailsUserComponent } from './pages/User/details-user/details-user.component';
import { AddUserComponent } from './pages/User/add-user/add-user.component';
import {DetailsEmployeeComponent} from "./pages/Employe/details-employe/details-employee.component";
import { AddEmployeComponent } from './pages/Employe/add-employe/add-employe.component';
import {AddDiplomeComponent} from "./pages/Diplome/add-diplome/add-diplome.component";
import {ListDiplomesComponent} from "./pages/Diplome/list-diplomes/list-diplomes.component";
import { ListContratComponent } from './pages/Contrat/list-contrat/list-contrat.component';
import { AddContratComponent } from './pages/Contrat/add-contrat/add-contrat.component';
import { EditContratComponent } from './pages/Contrat/edit-contrat/edit-contrat.component';
import { DashbordEmpComponent } from './pages/dashbord-emp/dashbord-emp.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },

  { path: 'dashboardEmp', component: DashbordEmpComponent },

  { path: 'pages-blank', component: PagesBlankComponent },

  { path: 'pages-error404', component: PagesError404Component },

  { path: 'pages-login', component: PagesLoginComponent },

  { path: 'user-profile', component: UsersProfileComponent },

  { path: 'add-formation', component: AddFormationComponent },
  { path: 'edit-formation/:id', component: EditFormationComponent },
  { path: 'list-formation', component: ListFormationsComponent },
  { path: 'details-profile', component: DetailsFormationComponent },


  { path: 'listusers', component: ListUserComponent },
  { path: 'userdetails/:id', component: DetailsUserComponent },
  { path: 'adduser', component: AddUserComponent },

  { path: 'employe-add', component: AddEmployeComponent },
  { path: 'employe-details/:id', component: DetailsEmployeeComponent },
  { path: 'employe-list', component: ListEmployeeComponent },

  { path: 'add-diplome', component: AddDiplomeComponent },
  { path: 'list-diplome', component: ListDiplomesComponent },

  { path: 'list-contrat', component: ListContratComponent },
  { path: 'add-contrat', component: AddContratComponent },

  { path: 'contratdetails/:id', component: EditContratComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
