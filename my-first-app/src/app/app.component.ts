import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-first-app';

  courseName: string = "Angular";

  imageUrl: string = "https://picsum.photos/200";

  count:number = 0;

  studentName:string="";

  increaseCounter():void {
    
    this.count++;
  }

  // --------------------------
  /* Parent To Child */
  // data = {
  //   relativeStatus:"Father",
  //   age:60,
  //   wealth:"2 Million $"
  // }



   /* Child to Parent */
   name:string="";

   childs:string[] = ["Rahul","Shubham","Monty","Mika"]

   setName(name:string){
    this.name = name;
   }
}
