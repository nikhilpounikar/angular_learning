import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RedirectionService {


  navigateToStudentList() {
    this.router.navigate(['./private/students']);
  }

  constructor(private sessionStorage:SessionStorageService,private router:Router) { }


   navigateToDashBoard(user: User) {
    if (user) {
      //const accessToken =
      this.sessionStorage.saveObjectToSessionStorage('accessToken', user.id);
      this.sessionStorage.saveObjectToSessionStorage('currentUser', user);
      this.router.navigate(['./private/dashboard']);
    }
  }

  navigateToLogin() {
    this.sessionStorage.clearSessionStorage();
    this.router.navigate(['']);
  }
}
