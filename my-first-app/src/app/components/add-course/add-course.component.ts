import { Component } from '@angular/core';
import { Course } from 'src/app/store/models/course.model';

@Component({
  selector: 'add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent {

    newCourse!:Course;

    constructor() {
      
    }

    addCourse():void{
      console.log('Adding Course');
    }

}
