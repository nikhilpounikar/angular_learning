import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../models/user';

@Component({
  selector: 'sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // Add other form controls as needed
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userForm.value.id = this.generateUniqueKey();
      const user: User = new User(this.userForm.value);
      console.log('User registration submitted:', user);
      // Add logic to send the user registration data to your backend
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
