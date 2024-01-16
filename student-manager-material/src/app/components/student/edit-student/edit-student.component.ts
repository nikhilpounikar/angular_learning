import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
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
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.css'
})
export class EditStudentComponent {

  inputData: any;
  addStudentForm: FormGroup;
  isUpdating: boolean;
  studentId: string;
  student?: Student;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
     private ref: MatDialogRef<EditStudentComponent>,
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private dbService: IndexedDbService,
    private redirectionService: RedirectionService,
    private route: ActivatedRoute
  ) {
    this.isUpdating = false;

    this.studentId = this.route.snapshot.params['id'];

    this.addStudentForm = this.prepareFormData();
  }

  ngOnInit(): void {
    this.studentId = this.data.studentId;
    this.inputData = this.data;
    if (this.studentId) {
      this.isUpdating=true;
      this.dbService.fetchStudentById(this.studentId).subscribe((student) => {
        this.student = student;
        this.addStudentForm = this.prepareFormData();
        this.disableEmail();
      });
    }
  }


  closepopup() {
    this.ref.close('Closed using function');
    console.log('Clossing Modal');
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
              this.closepopup();
            } else {
              alert('Failed to Update Student');
            }
          });
      } 


    } else {
      alert('Invalid input');
    }
  }


}
