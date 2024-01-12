import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectionService {

  constructor(private sessionStorage:SessionStorageService,private router:Router) { }


   navigateToDashBoard(userId: string) {
    if (userId) {
      //const accessToken =
      this.sessionStorage.saveObjectToSessionStorage('accessToken', userId);
      this.router.navigate(['./private/dashboard']);
    }
  }
}
