import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layout/public/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './layout/private/private-layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/public/login/login.component';
import { SignUpComponent } from './components/public/sign-up/sign-up.component';
import { UserAuthenticatedGuard } from './guards/authenticated';

export const routes: Routes = [

  {
    path: '',
    component: PrivateLayoutComponent,
    // canActivate: [userAuthenticatedGuard],
    canActivate: [UserAuthenticatedGuard],
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
