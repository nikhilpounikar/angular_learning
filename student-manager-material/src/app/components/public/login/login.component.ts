import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomValidationService } from '../../../services/custom-validation.service';
import { IndexedDbService } from '../../../services/index-db.service';
import { SessionStorageService } from '../../../services/session-storage.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/user';
import { RedirectionService } from '../../../services/redirection.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,

    private dbService: IndexedDbService,

    private redirectionService: RedirectionService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.valid) {
      this.dbService
        .getUserByEmail(this.email?.value)
        .subscribe((userList: Array<User>) => {
          console.log(userList);
          const index = userList.findIndex(
            (user) => user.password === this.password?.value
          );

          if (index !== -1) {
            this.redirectionService.navigateToDashBoard(userList[index]);
          } else {
            alert('Invalid Credentails');
          }
        });

      console.log('Siging in');
    }
  }
}
