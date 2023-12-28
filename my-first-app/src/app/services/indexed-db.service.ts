// // indexed-db.service.ts
// import { Injectable } from '@angular/core';
// import { Observable, from } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class IndexedDbService {

//   private db!: IDBDatabase; // You can use a default or dummy value

//   constructor() {
//     this.openDatabase();
//   }

//    openDatabase(): void {
//     const request = indexedDB.open('studentsDb', 2);

//     request.onupgradeneeded = (event: any) => {
//       this.db = event.target.result;
//       this.db.createObjectStore('students', {
//         keyPath: 'id',
//         autoIncrement: true,
//       });
//     };

//     request.onsuccess = (event: any) => {
      
//       this.db = event.target.result;
     
//     };

//     request.onerror = (event: any) => {
//       console.error('Error opening database:', event.error);
//     };
//   }

//   addStudent(student: any): Observable<any> {
//     return from(
//       new Promise<any>(async(resolve, reject) => {

//         const transaction = this.db.transaction('students', 'readwrite');
//         const store = transaction.objectStore('students');

//         const request = store.add(student);

//         request.onsuccess = (event: any) => {
//           resolve(event.target.result);
//         };

//         request.onerror = (event: any) => {
          
//           reject(event.error);
//         };
//       })
//     );
//   }

//   getAllStudents(): Observable<any[]> {
//     return from(
//       new Promise<any[]>(async(resolve, reject) => {
        
//         const transaction = this.db.transaction('students', 'readonly');
//         const store = transaction.objectStore('students');
//         const request = store.getAll();

//         request.onsuccess = (event: any) => {
//           resolve(event.target.result);
//         };

//         request.onerror = (event: any) => {
//           console.log(event);
//           reject(event.error);
//         };
//       })
//     );
//   }
// }


import { Injectable } from '@angular/core';
import { NgxIndexedDBService, ObjectStoreMeta } from 'ngx-indexed-db';
import { Student } from '../models/student.model';
import { Observable, from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  constructor(private dbService: NgxIndexedDBService) {}

  public configureDatabase(): void {
    const objectStoreMeta: ObjectStoreMeta = {
      store: 'students',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'address', keypath: 'address', options: { unique: false } },
        { name: 'age', keypath: 'age', options: { unique: false } }
      ]
    };

    this.dbService.createObjectStore(objectStoreMeta);
  }

  getAllStudents(): Observable<any[]> {
    // Use the 'from' function to convert the promise returned by 'getAll' into an observable
    return from(this.dbService.getAll('students'));
  }
  

  addStudent(student: any): Observable<any> {
    return from(this.dbService.add('students', student));
  }
  
  addStudentAndReloadList(newStudent: any): Observable<any[]> {
    return this.getAllStudents().pipe(
      switchMap((studentList: any[]) => {
        // Add a new student
        return this.addStudent(newStudent).pipe(
          // Fetch the updated student list
          switchMap(() => this.getAllStudents())
        );
      })
    );
  }
  
  
}
