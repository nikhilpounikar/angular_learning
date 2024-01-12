import { Component } from '@angular/core';
import { IndexedDbService } from '../../../services/index-db.service';
import { Student } from '../../../models/student';
import { CommonModule, DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Course } from '../../../models/course';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [DatePipe, CommonModule, RouterLink,MatDialog],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css',
})
export class StudentListComponent {
  students: Student[];
  studentByCourse: Student[];
  courseId: string;
  private subscription!: Subscription;
  isIndividualCourseViewes: boolean;
  course?: Course;

  constructor(
    private dbService: IndexedDbService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.students = [];
    this.studentByCourse = [];
    this.courseId = '';
    this.isIndividualCourseViewes = false;
  }

  private fetchStudents(): void {
    this.subscription = this.dbService
      .getAllStudents()
      .subscribe((students) => {
        console.log('Student List', students);
        this.students = students;

        if (this.courseId) {
          this.isIndividualCourseViewes = true;
          this.fetchStudentsByCourseId(this.courseId);
        }
      });
  }

  private fetchStudentsByCourseId(courseId: string) {
    this.subscription = this.dbService
      .fetchCourseById(courseId)
      .subscribe((course) => {
        this.course = course;

        this.filterStudents(course);
      });
  }

  private filterStudents(course: Course) {
    this.studentByCourse = this.students.filter((student) =>
      course.students.includes(student.studentId)
    );

    this.students = this.students.filter(
      (student) => !course.students.includes(student.studentId)
    );
  }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['id'];
    this.fetchStudents();
  }

  ngOnDestory(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  deleteStudent(studentId: string) {
    this.subscription = this.dbService
      .deleteStudent(studentId)
      .subscribe((status) => {

        if (status){

          this.fetchStudents();
          this.dbService.removeStudentFromAllCourses(studentId).subscribe((courseList)=>console.log(courseList));
        } 
      });
  }

  addStudentToCourse(studentId: string) {
    if (studentId && this.courseId && this.course) {
      this.course.students.push(studentId);
      this.dbService
        .updateCourse(this.course)
        .subscribe((course) => this.fetchStudents());

      this.mapStudentToCourse(studentId, this.courseId);
    }
  }

  private mapStudentToCourse(studentId: string, courseId: string) {
    let student = this.students.find(
      (student) => student.studentId === studentId
    );

    if (!student) {
      student = this.studentByCourse.find(
        (student) => student.studentId === studentId
      );
    }

    student?.courses.push(courseId);

    if (student) this.dbService.updateStudent(student).subscribe(stu=>console.log(stu));
  }

  openDialog(){

  }
}
