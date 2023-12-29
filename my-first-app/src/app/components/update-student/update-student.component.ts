import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.scss'],
})
export class UpdateStudentComponent implements OnInit {
  student!: Student;
  hasStudentFetched: boolean = false;

  private studentId!: number;
  private subscription!: Subscription;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve student ID from route parameters

    const param = this.route.snapshot.paramMap.get('id');
    if (param != null) this.studentId = parseInt(param);
    else this.studentId = -1;

    this.fetchStudentDetail();
    console.log('Student ID:', this.studentId);
  }

  private fetchStudentDetail(): void {
    this.subscription = this.studentService
      .fetchStudent(this.studentId)
      .subscribe((studentData) => {
        this.hasStudentFetched = true;
        this.student = studentData;
      });
  }

  updateStudent(): void {
    if (this.student) {
      this.student.id = this.studentId;
      this.subscription = this.studentService
        .updateStudent(this.student)
        .subscribe((updatedStudent) => {
          if (updatedStudent) {
            // After updating, navigate back to the student-list component
            this.router.navigate(['/home']);
          }
        });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
