import { Injectable } from '@angular/core';
import { NgxIndexedDBService, ObjectStoreMeta } from 'ngx-indexed-db';
import { Observable, forkJoin, from, switchMap } from 'rxjs';
import { Student } from '../models/student';
import { dummyCourses, dummyStudents } from '../data/dummy';
import { Course } from '../models/course';
import { User } from '../models/user';

@Injectable({ providedIn: 'root',})
export class IndexedDbService {
  
  
  students:Student[];  
  courses:Course[];  
  constructor(private dbService: NgxIndexedDBService) {
    this.students = dummyStudents;
    this.courses = dummyCourses;
  }

  getAllStudents(): Observable<Student[]> {
    // Use the 'from' function to convert the promise returned by 'getAll' into an observable
    //return from(this.dbService.getAll('students'));

    return this.dbService.getAll('students');
  }

  getAllCourses(): Observable<Course[]> {
    // Use the 'from' function to convert the promise returned by 'getAll' into an observable
    return this.dbService.getAll('courses');

    // return from(this.courses);
  }
  
  findUserByEmail(email:string):Observable<User>{

    return this.dbService.getByIndex('users', 'email', email);
  }

  getUserByEmail(email:string):Observable<User[]>{

    return this.dbService.getAllByIndex('users', 'email', IDBKeyRange.only(email));
    // return this.dbService.getByIndex('users', 'email', email);
  }

  addUser(user: User): Observable<User> {
    return this.dbService.add('users', user);
  }

  updateUser(user: User) {
    return this.dbService.update('users',user);
  }

  addStudent(student: any): Observable<Student> {
    return this.dbService.add('students', student);
  }

  findStudentByEmail(email:string):Observable<Student>{

    return this.dbService.getByIndex('students', 'email', email);
  }

  
  
//   addStudentAndReloadList(newStudent: any): Observable<any[]> {
//     return this.getAllStudents().pipe(
//       switchMap((studentList: any[]) => {
//         // Add a new student
//         return this.addStudent(newStudent).pipe(
//           // Fetch the updated student list
//           switchMap(() => this.getAllStudents())
//         );
//       })
//     );
//   }
  
  fetchStudentById(studentId: string):Observable<Student> {
    return this.dbService.getByID('students',studentId);
  }
  
  updateStudent(student: Student) {
    return this.dbService.update('students',student);
  }

  deleteStudent(studentId: string) {
    return this.dbService.deleteByKey('students',studentId);
  }

 // Related to courses
  addCourse(course: any): Observable<Course> {
    return this.dbService.add('courses', course);
  }

  fetchCourseById(courseId: string):Observable<Course> {
    return this.dbService.getByID('courses',courseId);
  }

  getCoursesById(courseId:String[]):Observable<Course[]>  {
    
    return this.dbService.getAllByIndex('courses', 'courseName', IDBKeyRange.only(courseId));
    // return this.dbService.getByID('courses',courseId);
  }

  deleteCourse(courseId: number) {
    return this.dbService.deleteByKey('courses',courseId);
  }

  updateCourse(course: Course) {
    return this.dbService.update('courses',course);
  }

  removeStudentFromAllCourses(studentId: string): Observable<Course[]> {
    // Fetch all courses
    return this.dbService.getAll('courses').pipe(
      switchMap((courses: any[]) => {
        const updateObservables = courses.map((course:Course) => {
          // Remove the student with the given studentId
          course.students = course.students.filter(id => id !== studentId);

          // Update the course in the database
          return this.dbService.update('courses', course);
        });

        // Use forkJoin to wait for all updates to complete
        return forkJoin(updateObservables);
      })
    );
  }
 
}