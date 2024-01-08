import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layout/public/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './layout/private/private-layout/private-layout.component';
import { CanActivateViaAuthGuard } from './guards/authenticated';
import { NotFoundError } from 'rxjs';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/public/login/login.component';
import { SignUpComponent } from './components/public/sign-up/sign-up.component';

export const routes: Routes = [

  {
    path: '',
    component: PrivateLayoutComponent,
    canActivate: [CanActivateViaAuthGuard],
    // canActivate: [CanActivateViaAuthGuard],
  },
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '',redirectTo:'/login', pathMatch:'full' },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
    ],
  },
 

  { path: '**', component: NotFoundComponent },
];
