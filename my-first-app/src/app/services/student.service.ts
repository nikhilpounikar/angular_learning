import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: Student[] = [
    { id: 1, name: 'John Doe', address: '123 Main St', age: 20 },
    { id: 2, name: 'Jane Smith', address: '456 Oak St', age: 22 },
    // Add more initial students as needed
  ];

  private studentsSubject = new BehaviorSubject<Student[]>(this.students);
  students$ = this.studentsSubject.asObservable();

  getAllStudents(): Observable<Student[]> {
    return this.students$;
  }

  addStudent(newStudent: Student): void {
    // Generate a unique ID for the new student
    newStudent.id = this.generateUniqueId();

    // Add the new student to the array
    this.students.push(newStudent);

    // Notify subscribers about the change
    this.studentsSubject.next(this.students);
  }

  private generateUniqueId(): number {
    // Replace with a proper logic to generate unique IDs
    // For simplicity, just using the current timestamp
    return this.students.length + 1;
  }
}
