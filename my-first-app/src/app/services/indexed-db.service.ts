// indexed-db.service.ts
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  // indexed-db.service.ts
  // indexed-db.service.ts
  private db: IDBDatabase = {} as IDBDatabase; // You can use a default or dummy value

  constructor() {
    this.openDatabase();
  }

  private openDatabase(): void {
    const request = indexedDB.open('studentsDb', 1);

    request.onupgradeneeded = (event: any) => {
      this.db = event.target.result;
      this.db.createObjectStore('students', {
        keyPath: 'id',
        autoIncrement: true,
      });
    };

    request.onsuccess = (event: any) => {
      this.db = event.target.result;
    };
  }

  addStudent(student: any): Observable<any> {
    return from(
      new Promise<any>((resolve, reject) => {
        const transaction = this.db.transaction(['students'], 'readwrite');
        const store = transaction.objectStore('students');

        const request = store.add(student);

        request.onsuccess = (event: any) => {
          resolve(event.target.result);
        };

        request.onerror = (event: any) => {
          reject(event.error);
        };
      })
    );
  }

  getAllStudents(): Observable<any[]> {
    return from(
      new Promise<any[]>((resolve, reject) => {
        const transaction = this.db.transaction(['students'], 'readonly');
        const store = transaction.objectStore('students');
        const request = store.getAll();

        request.onsuccess = (event: any) => {
          resolve(event.target.result);
        };

        request.onerror = (event: any) => {
          reject(event.error);
        };
      })
    );
  }
}
