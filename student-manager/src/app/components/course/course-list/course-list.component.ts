import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Course } from '../../../models/course';
import { IndexedDbService } from '../../../services/index-db.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent {


  courses:Course[];
  constructor(private dbService:IndexedDbService){

    this.courses = [];
    dbService.getAllCourses().subscribe(course =>  this.courses.push(course));
  }

}
