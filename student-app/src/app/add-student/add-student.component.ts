import { Component, EventEmitter, Output } from '@angular/core';
import { Student } from '../models/student.model';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'add-student',
  standalone: true,
  imports: [],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {

  @Output() addStudentEvent = new EventEmitter<Student>();
  studentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      age: [0, [Validators.required, Validators.min(1)]]
    });
  }

  addStudent() {
    if (this.studentForm.valid) {
      const newStudent: Student = this.studentForm.value;
      this.addStudentEvent.emit(newStudent);
      this.studentForm.reset();
    }
  }

}
