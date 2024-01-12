import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Course } from '../../../models/course';
import { IndexedDbService } from '../../../services/index-db.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { Student } from '../../../models/student';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
})
export class CourseListComponent {
  courses: Course[];
  studentCourse: Course[];
  private subscription!: Subscription;
  studentId: string;
  isIndividualStudentViewed: boolean;
  student?: Student;

  constructor(
    private dbService: IndexedDbService,
    private route: ActivatedRoute
  ) {
    this.courses = [];
    this.studentCourse = [];
    this.studentId = '';
    this.isIndividualStudentViewed = false;
  }

  private fetchCourses(): void {
    this.subscription = this.dbService.getAllCourses().subscribe((courses) => {
      this.courses = courses;

      if (this.studentId) {
        this.isIndividualStudentViewed = true;
        this.fetchCoursesByStudentId(this.studentId);
      }
    });
  }

  private fetchCoursesByStudentId(studentId: string) {
    this.subscription = this.dbService
      .fetchStudentById(studentId)
      .subscribe((student) => {
        this.student = student;

        this.filterCourses(student);
      });
  }

  private filterCourses(student: Student) {
    this.studentCourse = this.courses.filter((course) =>
      student.courses.includes(course.courseId)
    );

    this.courses = this.courses.filter(
      (course) => !student.courses.includes(course.courseId)
    );

    console.log('Student Courses', this.studentCourse);
    console.log('Remaining Courses', this.courses);
  }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.params['id'];
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

  addCourseToStudent(courseId: string) {
    if (courseId && this.studentId && this.student) {
      this.student.courses.push(courseId);
      this.dbService
        .updateStudent(this.student)
        .subscribe((student) => this.fetchCourses());

      this.mapCourseToStudent(courseId, this.studentId);
    }
  }

  private mapCourseToStudent(courseId: string, studentId: string) {
    let course = this.courses.find((course) => course.courseId === courseId);

    if (!course) {
      course = this.studentCourse.find(
        (course) => course.courseId === courseId
      );
    }

    course?.students.push(studentId);

    if (course)
      this.dbService.updateCourse(course).subscribe((cou) => console.log(cou));
  }
}
