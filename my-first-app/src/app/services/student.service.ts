// student.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IndexedDbService } from './indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentsSubject = new BehaviorSubject<any[]>([]);
  students$ = this.studentsSubject.asObservable();

  constructor(private indexedDbService: IndexedDbService) {
    this.loadStudents();
  }

  getAllStudents(): Observable<any[]> {
    return this.students$;
  }

  addStudent(newStudent: any): void {
    this.indexedDbService.addStudent(newStudent).subscribe(() => {
      this.loadStudents();
    });
  }

  private loadStudents(): void {
    this.indexedDbService.getAllStudents().subscribe((students) => {
      this.studentsSubject.next(students);
    });
  }
}
