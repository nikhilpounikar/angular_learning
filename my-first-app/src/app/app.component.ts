import { Component, Input } from '@angular/core';
import { ChildComponent } from './archived/child/child.component';
import { Child2Component } from './archived/child-2/child-2.component';
import { Child3Component } from './archived/child-3/child-3.component';
import { Student } from './models/student.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

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
