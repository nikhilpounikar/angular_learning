import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { IndexedDbService } from './index-db.service';

@Injectable({
  providedIn: 'root',
})
export class CustomValidationService {
  constructor( private dbService:IndexedDbService) {}

  passwordMatchValidator(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['passwordMismatch']
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }

      return null;
    };
  }

  validateEmailNotTaken(control: AbstractControl) {
    return this.dbService.findUserByEmail(control.value).subscribe(user => user? null: {emailTaken:true});
  }

  //Fake API call -- You can have this in another service
  checkUsernameTaken(username: string): boolean {
    return false;
  }
}
