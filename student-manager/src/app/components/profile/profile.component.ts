import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidationService } from '../../services/custom-validation.service';
import { IndexedDbService } from '../../services/index-db.service';
import { RedirectionService } from '../../services/redirection.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { SessionStorageService } from '../../services/session-storage.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  shouldNotUpdate:boolean;
  userForm: FormGroup;
  currentUser:User;
  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private dbService: IndexedDbService,
    private redirectionService: RedirectionService,
    private sessionStorage: SessionStorageService
  ) {
    
    this.currentUser = this.sessionStorage.getCurrentUser();
 
    this.userForm = this.fb.group(
      {
        firstName: [this.currentUser.firstName, Validators.required],
        lastName: [this.currentUser.lastName, Validators.required],
        email: [
          this.currentUser.email,
          [Validators.required, Validators.email],
          this.customValidator.validateEmailNotTaken.bind(this.customValidator),

        ],
        password: [this.currentUser.password, [Validators.required]],
        confirmPassword: [this.currentUser.password, [Validators.required]],
        // Add other form controls as needed
      },
      {
        validator: this.customValidator.passwordMatchValidator(
          'password',
          'confirmPassword'
        ),
      }
    );
    
    this.disableEmail();
    this.shouldNotUpdate = true;
  }

  
  disableEmail() {
    this.userForm.get('email')?.disable();
  }

  onSubmit() {
    if (this.userForm.valid && this.userForm.value != this.currentUser) {
      

      const user: User = new User(this.userForm.value);
      user.id = this.currentUser.id;
      user.email = this.currentUser.email
      console.log(user);
      this.dbService
        .updateUser(user)
        .subscribe((user: User) =>
          this.redirectionService.navigateToDashBoard(user)
        );
      // Add logic to send the user registration data to your backend
    } else {
      console.log(this.userForm);
    }
  }

  changeUpdate(){
    console.log('Changing')
    this.shouldNotUpdate != this.shouldNotUpdate;
  }
}
