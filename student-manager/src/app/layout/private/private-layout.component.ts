import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { IndexedDbService } from '../../services/index-db.service';

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [HeaderComponent,SidebarComponent,RouterOutlet,FooterComponent],
  providers:[IndexedDbService],
  templateUrl: './private-layout.component.html',
  styleUrl: './private-layout.component.css'
})
export class PrivateLayoutComponent {

}
