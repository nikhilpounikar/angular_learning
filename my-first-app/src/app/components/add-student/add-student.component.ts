import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/models/student.model';
import { IndexedDbService } from 'src/app/services/indexed-db.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent {

  newStudent: Student = new Student( '', '', 0);

  private subscription!: Subscription;

  constructor(private indexedDbService: IndexedDbService) {}

  addStudent(): void {
    
    this.indexedDbService.addStudent(this.newStudent).subscribe((studentId)=>{
      console.log(studentId);
      this.newStudent = new Student( '', '', 0); // Clear the form
    });
  }

}
