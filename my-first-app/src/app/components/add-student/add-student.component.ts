import { Component, EventEmitter, Output } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent {

  newStudent: Student = new Student(0, '', '', 0);

  constructor(private studentService: StudentService) {}

  addStudent(): void {
    this.studentService.addStudent(this.newStudent);
    this.newStudent = new Student(0, '', '', 0); // Clear the form
  }

}
