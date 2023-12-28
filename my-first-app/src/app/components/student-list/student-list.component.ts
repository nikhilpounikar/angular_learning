import { Component, Input, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit{


  students: Student[];

  constructor(private studentService: StudentService) {
    this.students = [];
  }

  ngOnInit():void{
    this.studentService.getAllStudents().subscribe((students) => {
      this.students = students;
    });
  }



}
