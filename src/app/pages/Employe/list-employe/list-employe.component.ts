import { Component, OnInit } from '@angular/core';
import { Employe } from 'src/app/models/Employe';

@Component({
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.css']
})
export class ListEmployeComponent implements OnInit {
  employees?:Employe[];
  currentIndex = -1;
  empname = '';
  constructor() { }

  ngOnInit(): void {
  }

}
