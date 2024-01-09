import { Component } from '@angular/core';
import { IndexedDbService } from '../../../services/index-db.service';
import { Student } from '../../../models/student';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [DatePipe,CommonModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {

    students:Student[];
    constructor(private dbService:IndexedDbService){

      this.students = [];
      dbService.getAllStudents().subscribe(stud =>  this.students.push(stud));
    }
}
