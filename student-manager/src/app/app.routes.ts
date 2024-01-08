import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layout/public/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './layout/private/private-layout/private-layout.component';
import { CanActivateViaAuthGuard } from './guards/authenticated';
import { NotFoundError } from 'rxjs';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: PrivateLayoutComponent,
    // canActivate: [CanActivateViaAuthGuard],
  },
  { path: '', component: PublicLayoutComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
