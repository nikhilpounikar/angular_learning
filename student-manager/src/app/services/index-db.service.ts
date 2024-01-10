import { Injectable } from '@angular/core';
import { NgxIndexedDBService, ObjectStoreMeta } from 'ngx-indexed-db';
import { Observable, from, switchMap } from 'rxjs';
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

  getAllStudents(): Observable<Student> {
    // Use the 'from' function to convert the promise returned by 'getAll' into an observable
    //return from(this.dbService.getAll('students'));

    return from(this.students);
  }

  getAllCourses(): Observable<Course> {
    // Use the 'from' function to convert the promise returned by 'getAll' into an observable
    //return from(this.dbService.getAll('students'));

    return from(this.courses);
  }
  
  findUserByEmail(email:string):Observable<User>{

    return this.dbService.getByIndex('users', 'email', email);;
  }

  addStudent(student: any): Observable<any> {
    return this.dbService.add('students', student);
  }

  addUser(user: User): Observable<User> {
    return this.dbService.add('users', user);
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
  
  fetchStudentById(studentId: number):Observable<Student> {
    return this.dbService.getByID('students',studentId);
  }
  
  updateStudent(student: Student) {
    return this.dbService.update('students',student);
  }

  deleteStudent(studentId: number) {
    return this.dbService.deleteByKey('students',studentId);
  }
 
}