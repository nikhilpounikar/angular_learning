import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layout/public/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './layout/private/private-layout/private-layout.component';
import { CanActivateViaAuthGuard } from './guards/authenticated';
import { NotFoundError } from 'rxjs';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/public/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: LoginComponent },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  {
    path: '',
    component: PrivateLayoutComponent,
    canActivate: [CanActivateViaAuthGuard],
    // canActivate: [CanActivateViaAuthGuard],
  },

  { path: '**', component: NotFoundComponent },
];
