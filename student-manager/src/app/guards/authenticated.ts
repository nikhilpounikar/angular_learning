import { Injectable, inject } from '@angular/core';
import {  CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, } from '../reducers/index';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionStorageService } from '../services/session-storage.service';

// @Injectable()
// class UserAuthenticationService {
//   canActivate(): boolean {
//     return false;
//   }

// }

// export const userAuthenticatedGuard: CanActivateFn =  (route, state) => {
//   return inject(UserAuthenticationService).canActivate();
// };



@Injectable({
  providedIn: 'root',
})
export class UserAuthenticatedGuard implements CanActivate {

  constructor(private sessionStorage:SessionStorageService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Your guard logic here
    return this.sessionStorage.hasAccessToken(); // or false based on your conditions
  }
}
