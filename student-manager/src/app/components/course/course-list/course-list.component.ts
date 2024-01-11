import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Course } from '../../../models/course';
import { IndexedDbService } from '../../../services/index-db.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
})
export class CourseListComponent {
  courses: Course[];

  private subscription!: Subscription;

  constructor(private dbService: IndexedDbService) {
    this.courses = [];
  }

  private fetchCourses(): void {
    this.subscription = this.dbService.getAllCourses().subscribe((courses) => {
      console.log('Course List', courses);
      this.courses = courses;
    });
   
  }
  ngOnInit(): void {
    this.fetchCourses();
  }

  ngOnDestory(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  deleteCourse(studentId: number) {
    this.subscription = this.dbService
      .deleteStudent(studentId)
      .subscribe((status) => {
        if (status) this.fetchCourses();
      });
  }
}
