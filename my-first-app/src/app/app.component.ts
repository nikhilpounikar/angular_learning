import { Component, Input, OnInit } from '@angular/core';
import { Student } from './models/student.model';
import { IndexedDbService } from './services/indexed-db.service';
import { Observable } from 'rxjs';
import { Course } from './store/models/course.model';
import { Store } from '@ngrx/store';
import { State as AppState } from './store/models/state.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent  {


    courses$: Observable<Array<Course>>;


    // Array to store the list of students
    students: Student[] = [];

    

    // Method to handle the event emitted by the AddStudent component
    handleAddStudent(student: Student) {
      // Assign a unique ID before adding the student to the list
      student.id = this.students.length + 1;
      // Add the new student to the list
      this.students.push(student);
      // Log the list of students
      console.log('List of Students:', this.students);
    }


    constructor(private indexedDbService: IndexedDbService,private store: Store<AppState>) {
      this.courses$ = this.store.select((store) => store.courses);
    }

    ngOnInit(): void {
      this.configureIndexedDB();
    }
  
    private configureIndexedDB(): void {
      this.indexedDbService.configureDatabase();
    }
    








































  
  /* Data Binding One Way */
  // title = 'my-first-app';

  // courseName: string = "Angular";

  // imageUrl: string = "https://picsum.photos/200";

  // count:number = 0;

  // studentName:string="";

  // increaseCounter():void {

  //   this.count++;
  // }

  // --------------------------
  /* Parent To Child */
  // data = {
  //   relativeStatus:"Father",
  //   age:60,
  //   wealth:"2 Million $"
  // }

  // --------------------------
  /* Child to Parent */
  //  name:string="";

  //  childs:string[] = ["Rahul","Shubham","Monty","Mika"]

  //  setName(name:string){
  //   this.name = name;
  //  }

  // --------------------------
  /* Dynamic Components */

  // childType: any;

  // ngOnInit() {
  //   this.childType = ChildComponent;
  // }

  // selectChild(child: string): void {
  //   if (child === 'child_1') this.childType = ChildComponent;
  //   else if (child === 'child_2') this.childType = Child2Component;
  //   else this.childType = Child3Component;
  // }
}
