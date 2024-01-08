import { Component } from '@angular/core';
import { PublicHeaderComponent } from '../../../components/public/public-header/public-header.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    PublicHeaderComponent,
  ],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.css',
})
export class PublicLayoutComponent {}
