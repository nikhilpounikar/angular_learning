import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { IndexedDbService } from './indexed-db.service';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private studentsSubject = new BehaviorSubject<any[]>([]);
  students$ = this.studentsSubject.asObservable();

  constructor(private indexedDbService: IndexedDbService) {
    this.loadStudents();
  }

  // Use the map operator to transform the emitted array into its length
  studentListLengthObservable: Observable<number> = this.students$.pipe(
    map((studentList) => studentList.length)
  );

  getAllStudents(): Observable<any[]> {
    return this.students$;
  }

  addStudent(newStudent: any) {
    this.indexedDbService.addStudent(newStudent).subscribe((key) => {
      console.log(key, 'Added');
    });

    this.loadStudents();
  }

  // this.addStudentAndReloadList(newStudent).subscribe(
  //   (updatedStudentList: any[]) => {
  //     console.log('Updated Student List:', updatedStudentList);
  //   },
  //   (error) => {
  //     console.error('Error adding student and reloading list:', error);
  //   }
  // );

  private loadStudents() {
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
