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


  private loadStudents() {
    this.indexedDbService.getAllStudents().subscribe((students) => {
      this.studentsSubject.next(students);
    });
  }

  fetchStudent(studentId: number):Observable<Student> {
    return this.indexedDbService.fetchStudentById(studentId);
  }

}
