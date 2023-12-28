import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { Student } from './models/student.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,AddStudentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'student-app';

  // Array to store the list of students
  students: Student[] = [];

  // Method to handle the event emitted by the AddStudent component
  handleAddStudent(student: Student) {
    // Assign a unique ID before adding the student to the list
    student.id = this.students.length + 1;
    // Add the new student to the list
    this.students.push(student);
    // Log the list of students
    console.log('List of Students:', this.students);
  }
}
