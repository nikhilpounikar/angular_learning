import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AddItemAction, CourseActionType } from 'src/app/store/actions/course.action';
import { Course } from 'src/app/store/models/course.model';
import { State as AppState } from 'src/app/store/models/state.model';


@Component({
  selector: 'add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent {
  // newCourse!: Course;
  courseId:string

  constructor(private store: Store<AppState>) {

    this.courseId = this.generateCourseID();
  }

  addCourse(form: NgForm) {

    if(!form.value.id)
     form.value.id = this.generateCourseID();

    this.store.dispatch(new AddItemAction(form.value));
    console.log(form.value);
    form.reset();
  }

   private generateCourseID():string{
    const length = 12; // You can adjust the length as needed
    const characters = 'COURSE';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }
}
