import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/models/student.model';
import { IndexedDbService } from 'src/app/services/indexed-db.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit{


  students: Student[];

  private subscription!: Subscription;

  constructor(private indexedDbService: IndexedDbService) {
    this.students = [];
  }

  ngOnInit():void{
    this.subscription = this.indexedDbService.getAllStudents().subscribe((students) => {
      console.log("Student List",students);
      this.students = students;
    });
  }

  ngOnDestory():void{

    if(this.subscription)
     this.subscription.unsubscribe();
  }
  


}
