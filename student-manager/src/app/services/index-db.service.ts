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

  getAllStudents(): Observable<Student[]> {
    // Use the 'from' function to convert the promise returned by 'getAll' into an observable
    //return from(this.dbService.getAll('students'));

    return this.dbService.getAll('students');
  }

  getAllCourses(): Observable<Course> {
    // Use the 'from' function to convert the promise returned by 'getAll' into an observable
    //return from(this.dbService.getAll('students'));

    return from(this.courses);
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