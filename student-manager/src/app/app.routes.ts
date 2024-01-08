import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layout/public/public-layout/public-layout.component';

export const routes: Routes = [

    {path:'', component:PublicLayoutComponent, pathMatch:'full'}
];
