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

  data = {
    relativeStatus:"Father",
    age:60,
    wealth:"2 Million $"
  }

}
