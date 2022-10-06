import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  username?: string;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    const user = this.storageService.getUser();
    this.username = user.firstName;
  }
  sidebarToggle() {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }
  logout() {
    if (this.storageService.isLoggedIn()) {
      window.sessionStorage.removeItem('auth-user');
      this.storageService.clean;
      window.location.reload();
    }
  }
}
