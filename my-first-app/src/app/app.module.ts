import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { courseReducer } from './store/reducers/course.reducer';
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
import { CourseListComponent } from './components/course-list/course-list.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

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
    CourseListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    StoreModule.forRoot({
      courses: courseReducer as ActionReducer<Course[], Action>,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [IndexedDbService],
  bootstrap: [AppComponent],
})
export class AppModule {}
