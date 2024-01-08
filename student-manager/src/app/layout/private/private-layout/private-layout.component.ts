import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './private-layout.component.html',
  styleUrl: './private-layout.component.css'
})
export class PrivateLayoutComponent {

}
