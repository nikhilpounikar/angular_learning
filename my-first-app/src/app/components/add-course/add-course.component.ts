import { Component } from '@angular/core';
import { Course } from 'src/app/store/models/course.model';

@Component({
  selector: 'add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent {
  newCourse!: Course;

  constructor() {
    this.newCourse = {
      id: this.generateCourseID(),
      name: '',
      price: 999,
      currency: 'INR',
      description: '',
    };
  }

  addCourse(): void {
    console.log('Adding Course');
  }

  private generateCourseID():string{
    const length = 12; // You can adjust the length as needed
    const characters = 'COURSE-';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }
}
