import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RedirectionService } from '../../../services/redirection.service';
import { SessionStorageService } from '../../../services/session-storage.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(
    private redirectionService: RedirectionService,
    private sessionStorage: SessionStorageService
  ) {

  }

  logOut(){
    this.redirectionService.navigateToLogin();
  }

}
