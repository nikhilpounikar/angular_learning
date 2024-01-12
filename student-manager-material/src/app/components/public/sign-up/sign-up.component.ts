import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../../models/user';
import { CommonModule } from '@angular/common';
import { CustomValidationService } from '../../../services/custom-validation.service';
import { IndexedDbService } from '../../../services/index-db.service';
import { SessionStorageService } from '../../../services/session-storage.service';
import { Router } from '@angular/router';
import { RedirectionService } from '../../../services/redirection.service';

@Component({
  selector: 'sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private dbService: IndexedDbService,
    private redirectionService: RedirectionService
  ) {
    this.userForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: [
          '',
          [Validators.required, Validators.email],
          this.customValidator.validateEmailNotTaken.bind(this.customValidator),
        ],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        // Add other form controls as needed
      },
      {
        validator: this.customValidator.passwordMatchValidator(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userForm.value.id = this.generateUniqueKey();
      const user: User = new User(this.userForm.value);
      this.dbService
        .addUser(user)
        .subscribe((user: User) =>
          this.redirectionService.navigateToDashBoard(user)
        );
      // Add logic to send the user registration data to your backend
    } else {
      console.log(this.userForm);
    }
  }

  private generateUniqueKey() {
    const length = 12; // You can adjust the length as needed
    const characters = 'gkaskdfjsgdfgsdfjkhlsdklfsdfsjl';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }
}
