import { Component, EventEmitter, Output } from '@angular/core';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent {

  // Define a property for student information using the Student model
  newStudent: Student = new Student(0, '', '', 0);

  // EventEmitter to notify the parent component about the new student
  @Output() addStudentEvent = new EventEmitter<Student>();

  // Method to add a new student and emit the event
  addStudent() {
    // Validate student data before emitting the event
    if (this.newStudent.name && this.newStudent.age > 0) {
      this.addStudentEvent.emit(this.newStudent);
      // Clear input fields after adding a student
      this.newStudent = new Student(0, '', '', 0);
    }
  }

}
