import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent {

  /* Parent to Child */
  // @Input() info:any;

  // relativeStatus:string = "Son";

  /* Child to Parent */
  @Input() childName:any;

  @Output() selectChild = new EventEmitter<string>();

  sendDataToParent(){
    this.selectChild.emit(this.childName);
  }


}
