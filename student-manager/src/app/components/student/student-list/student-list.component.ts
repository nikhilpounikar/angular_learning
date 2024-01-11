import { Component } from '@angular/core';
import { IndexedDbService } from '../../../services/index-db.service';
import { Student } from '../../../models/student';
import { CommonModule, DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [DatePipe,CommonModule,RouterLink],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {

    students:Student[]
    private subscription!: Subscription;

    constructor(private dbService:IndexedDbService){
      this.students = [];
    }

    private fetchStudents():void{
      this.subscription = this.dbService.getAllStudents().subscribe((students) => {
        console.log("Student List",students);
        this.students = students;
      });
    }
    ngOnInit():void{
      this.fetchStudents();
    }
  
    ngOnDestory():void{
      if(this.subscription)
       this.subscription.unsubscribe();
    }
    
    deleteStudent(studentId: number) {
      
      this.subscription = this.dbService.deleteStudent(studentId).subscribe((status) => {
  
          if(status)
           this.fetchStudents();
      });
    }
}
