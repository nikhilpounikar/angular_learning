import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
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

  async addStudent(newStudent: any) {
      await this.indexedDbService.addStudent(newStudent)
      this.loadStudents();
  }

  private async loadStudents() {
    this.indexedDbService.getAllStudents().subscribe((students) => {
          this.studentsSubject.next(students);
      });
  }

  // private loadStudents(): void {
  //   this.indexedDbService.getAllStudents().subscribe((students) => {
  //     this.studentsSubject.next(students);
  //   });
  // }
}
