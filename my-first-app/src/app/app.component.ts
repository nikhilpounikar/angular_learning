import { Component, Input } from '@angular/core';
import { ChildComponent } from './child/child.component';
import { Child2Component } from './child-2/child-2.component';
import { Child3Component } from './child-3/child-3.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
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

  childType: any;

  ngOnInit() {
    this.childType = ChildComponent;
  }

  selectChild(child: string): void {
    if (child === 'child_1') this.childType = ChildComponent;
    else if (child === 'child_2') this.childType = Child2Component;
    else this.childType = Child3Component;
  }
}
