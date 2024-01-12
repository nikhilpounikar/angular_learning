import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidationService } from '../../../services/custom-validation.service';
import { IndexedDbService } from '../../../services/index-db.service';
import { RedirectionService } from '../../../services/redirection.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../../models/course';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {

  addCourseForm: FormGroup;
  isUpdating: boolean;
  courseId: string;
  course?: Course;


  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private dbService: IndexedDbService,
    private route: ActivatedRoute
    
  ) {
    this.courseId = this.route.snapshot.params['id'];
    this.isUpdating = this.courseId ? true:false;
 


    this.addCourseForm = this.fb.group(
      {
        courseName: ['', Validators.required],
       
        price: [99, [Validators.required]],
        
      },
    );
  }

  private prepareFormData() {


    return this.fb.group(
      {
        courseId: this.course?.courseId || '',
        courseName: [this.course?.courseName || '', Validators.required],
       
        price: [this.course?.price || '', [Validators.required]],
        students: this.course?.students || []
      },
    );
  }

  get courseName() {
    return this.addCourseForm.get('courseName');
  }

  get price() {
    return this.addCourseForm.get('price');
  }

  addCourse() {
    if (this.addCourseForm.valid) {
      this.addCourseForm.value.courseId = this.generateUniqueKey();
      this.addCourseForm.value.students = [];

      this.dbService
        .addCourse(this.addCourseForm.value)
        .subscribe((course) => {
          alert(course.courseName+" is added.");
          this.resetFormData();
        });
      // Add logic to send the user registration data to your backend
    } else {
      alert('Invalid input')
    }
  }

  private resetFormData(){

    this.addCourseForm.reset();
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
