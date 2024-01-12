import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomValidationService } from '../../../services/custom-validation.service';
import { IndexedDbService } from '../../../services/index-db.service';
import { RedirectionService } from '../../../services/redirection.service';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../../../models/student';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css',
})
export class AddStudentComponent {
  addStudentForm: FormGroup;
  isUpdating: boolean;
  studentId: string;
  student?: Student;

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private dbService: IndexedDbService,
    private redirectionService: RedirectionService,
    private route: ActivatedRoute
  ) {
    this.isUpdating = false;
    this.studentId = '';
    this.studentId = this.route.snapshot.params['id'];

    this.addStudentForm = this.prepareFormData();
  }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.params['id'];

    if (this.studentId) {
      this.isUpdating=true;
      this.dbService.fetchStudentById(this.studentId).subscribe((student) => {
        this.student = student;
        this.addStudentForm = this.prepareFormData();
        this.disableEmail();
      });
    }
  }

  private prepareFormData() {
    let duplicateEmailValidator =
      this.customValidator.validateStudentEmailNotTaken.bind(
        this.customValidator
      );

    return this.fb.group(
      {
        studentId: this.student?.studentId,
        name: [this.student?.name || '', Validators.required],
        email: [
          this.student?.email || '',
          [Validators.required, Validators.email],
          ,
          duplicateEmailValidator,
        ],
        dateOfBirth: [this.student?.dateOfBirth || '', [Validators.required]],
        gender: [this.student?.gender || '', [Validators.required]],
      },
      {
        validator: this.customValidator.passwordMatchValidator(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  disableEmail() {
    this.email?.disable();
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
      if (this.isUpdating && this.addStudentForm.value) {
        
        this.addStudentForm.value.email = this.student?.email;
        this.addStudentForm.value.courses = this.student?.courses;

        this.dbService
          .updateStudent(this.addStudentForm.value)
          .subscribe((student) => {
            if (student) {
              this.redirectionService.navigateToStudentList();
            } else {
              alert('Failed to Update Student');
            }
          });
      } else {
        this.addStudentForm.value.studentId = this.generateUniqueKey();
        this.addStudentForm.value.courses = [];

        this.dbService
          .addStudent(this.addStudentForm.value)
          .subscribe((student) => {
            alert(student.name + ' is added.');
            this.resetFormData();
          });
      }

      // Add logic to send the user registration data to your backend
    } else {
      alert('Invalid input');
    }
  }

  private resetFormData() {
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
