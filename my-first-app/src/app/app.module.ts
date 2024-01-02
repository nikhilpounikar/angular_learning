import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { courseReducer as CourseReducer } from './store/reducers/course.reducer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { IndexedDbService } from './services/indexed-db.service';
import { UpdateStudentComponent } from './components/update-student/update-student.component';
import { Action, ActionReducer, StoreModule } from '@ngrx/store';
import { Course } from './store/models/course.model';
import { AddCourseComponent } from './components/add-course/add-course.component';

const dbConfig: DBConfig = {
  name: 'studentDB',
  version: 2,
  objectStoresMeta: [],
};

@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    StudentListComponent,
    NavbarComponent,
    UpdateStudentComponent,
    AddCourseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    StoreModule.forRoot({
      course: CourseReducer as ActionReducer<Course[], Action>,
    }),
  ],
  providers: [IndexedDbService],
  bootstrap: [AppComponent],
})
export class AppModule {}
