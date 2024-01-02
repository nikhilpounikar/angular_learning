import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from 'src/app/store/models/course.model';
import { State as AppState } from 'src/app/store/models/state.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent {

  courses$: Observable<Array<Course>>;
  
  constructor(private store: Store<AppState>) {
    this.courses$ = this.store.select((store) => store.courses);
  }


}
