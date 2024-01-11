import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomValidationService } from '../../../services/custom-validation.service';
import { IndexedDbService } from '../../../services/index-db.service';
import { RedirectionService } from '../../../services/redirection.service';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css',
})
export class AddStudentComponent {
  addStudentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private dbService: IndexedDbService,
    private redirectionService: RedirectionService
  ) {
    this.addStudentForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: [
          '',
          [Validators.required, Validators.email],
          this.customValidator.validateStudentEmailNotTaken.bind(this.customValidator),
        ],
        dateOfBirth: [null, [Validators.required]],
        gender: ['', [Validators.required]],
      },
      {
        validator: this.customValidator.passwordMatchValidator(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  get email() {
    return this.addStudentForm.get('email');
  }

  get name() {
    return this.addStudentForm.get('name');
  }

  get dateOfBirth() {
    return this.addStudentForm.get('dateOfBirth');
  }

  get gender() {
    return this.addStudentForm.get('gender');
  }

  addStudent() {
    if (this.addStudentForm.valid) {
      this.addStudentForm.value.studentId = this.generateUniqueKey();
      this.addStudentForm.value.courses = [];

      this.dbService
        .addStudent(this.addStudentForm.value)
        .subscribe((student) => {
          alert(student.name+" is added.");
          this.resetFormData();
        });
      // Add logic to send the user registration data to your backend
    } else {
      alert('Invalid input')
    }
  }

  private resetFormData(){

    this.addStudentForm.reset();
  }

  private generateUniqueKey() {
    const length = 8; // You can adjust the length as needed
    const characters = 'gkaskdfjsgdfgsdfjkhlsdklfsdfsjl';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result.toUpperCase();
  }
}
