import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  saveObjectToSessionStorage(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getObjectFromSessionStorage(key: string): any {
    const storedValue = sessionStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  }

  removeItemFromSessionStorage(key: string): void {
    sessionStorage.removeItem(key);
  }

  clearSessionStorage(): void {
    sessionStorage.clear();
  }

  hasAccessToken():boolean{
    const accessToken = sessionStorage.getItem('accessToken');
    console.log(accessToken);
    return accessToken ? true: false;
  }
}