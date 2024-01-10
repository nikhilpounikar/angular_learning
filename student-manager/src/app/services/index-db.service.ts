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

    this.configureDatabase();
  }

  public configureDatabase(): void {
    const studentObjectStoreMeta: ObjectStoreMeta = {
      store: 'students',
      storeConfig: { keyPath: 'studentId', autoIncrement: false },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'email', keypath: 'email', options: { unique: true } },
        { name: 'dateOfBirth', keypath: 'dateOfBirth', options: { unique: false } },
        { name: 'gender', keypath: 'gender', options: { unique: false } },
        { name: 'courses', keypath: 'courses', options: { unique: false } }

      ]
    };

    const coursesObjectStoreMeta: ObjectStoreMeta = {
        store: 'courses',
        storeConfig: { keyPath: 'courseId', autoIncrement: false }, // Adjust keyPath and autoIncrement based on your requirements
        storeSchema: [
          { name: 'courseName', keypath: 'courseName', options: { unique: false } },
          { name: 'price', keypath: 'price', options: { unique: false } },
          { name: 'students', keypath: 'students', options: { unique: false } },
          // Add other properties specific to the courses collection
        ]
    };

    const userObjectStoreMeta: ObjectStoreMeta = {
        store: 'users',
        storeConfig: { keyPath: 'id', autoIncrement: true }, // Adjust keyPath and autoIncrement based on your requirements
        storeSchema: [
          { name: 'firstName', keypath: 'firstName', options: { unique: false } },
          { name: 'lastName', keypath: 'lastName', options: { unique: false } },
          { name: 'password', keypath: 'password', options: { unique: false } },
          { name: 'email', keypath: 'email', options: { unique: true } },
          { name: 'accessToken', keypath: 'accessToken', options: { unique: false } },
          // Add other properties specific to the courses collection
        ]
    };

    this.dbService.createObjectStore(studentObjectStoreMeta);
    this.dbService.createObjectStore(coursesObjectStoreMeta);
    this.dbService.createObjectStore(userObjectStoreMeta);
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