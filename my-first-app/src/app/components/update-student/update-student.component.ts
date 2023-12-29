import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.scss']
})
export class UpdateStudentComponent implements OnInit {


  student!: Student;
  hasStudentFetched:boolean = false;

  private studentId!:number;
  constructor(private studentService: StudentService,private route: ActivatedRoute) {}

  ngOnInit(): void {
     // Retrieve student ID from route parameters

     const param = this.route.snapshot.paramMap.get('id');
     if(param != null)
      this.studentId = parseInt(param);
     else 
      this.studentId = -1;

     this.fetchStudentDetail();
     console.log('Student ID:', this.studentId);
  }

  private fetchStudentDetail():void{

    this.studentService.fetchStudent(this.studentId).subscribe((studentData)=>{

      this.hasStudentFetched = true;
      this.student = studentData;
    })
  }

  updateStudent(): void {
    this.studentService.studentListLengthObservable.subscribe((length)=>{
      this.student.id = length + 1;
    })
    this.studentService.addStudent(this.student);
    this.student = new Student(0, '', '', 0); // Clear the form
  }

}
