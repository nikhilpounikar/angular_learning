import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { IndexedDbService } from './index-db.service';
import { User } from '../models/user';
import { Student } from '../models/student';

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
 
    return this.checkEmailNotTaken(control.value).pipe(
      map(res => {
        return res ? null : { emailTaken: true };
      })
    );

  }

  

  //Fake API call -- You can have this in another service
  checkEmailNotTaken(email: string): Observable<boolean> {

    return this.dbService.findUserByEmail(email).pipe(
      map((user: User) =>
        
        user ? false:true
      ),
     
    );
  }


  validateStudentEmailNotTaken(control: AbstractControl) {
 
    return this.checkStudentEmailNotTaken(control.value).pipe(
      map(res => {
        return res ? null : { emailTaken: true };
      })
    );

  }

  //Fake API call -- You can have this in another service
  checkStudentEmailNotTaken(email: string): Observable<boolean> {

    return this.dbService.findStudentByEmail(email).pipe(
      map((student: Student) =>
        
      student ? false:true
      ),
     
    );
  }
}
