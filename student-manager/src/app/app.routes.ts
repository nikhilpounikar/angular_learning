import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layout/public/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './layout/private/private-layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/public/login/login.component';
import { SignUpComponent } from './components/public/sign-up/sign-up.component';
import { UserAuthenticatedGuard } from './guards/authenticated';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentListComponent } from './components/student/student-list/student-list.component';
import { AddStudentComponent } from './components/student/add-student/add-student.component';
import { CourseListComponent } from './components/course/course-list/course-list.component';
import { AddCourseComponent } from './components/course/add-course/add-course.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  {
    path: 'private',
    component: PrivateLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'students',
        children: [
          { path: '', pathMatch: 'full', component: StudentListComponent },
          {path:'add',component:AddStudentComponent},
          {path:'update/:id',component:AddStudentComponent},
        ],
      },
      {
        path: 'courses',
        children: [
          { path: '', pathMatch: 'full', component: CourseListComponent },
          {path:'add',component:AddCourseComponent},
          {path:'view/:id',component:CourseListComponent},
          {path:'update/:id',component:AddCourseComponent}
        ],
      },
      {
        path: 'profile',
        children: [
          { path: '', pathMatch: 'full', component: ProfileComponent },
        ],
      },
      { path: '**', component: NotFoundComponent },
    ],
    // canActivate: [userAuthenticatedGuard],
    canActivate: [UserAuthenticatedGuard],
  },
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
        canActivate: [UserAuthenticatedGuard],
      },
    ],
  },

  { path: '**', component: NotFoundComponent },
];
