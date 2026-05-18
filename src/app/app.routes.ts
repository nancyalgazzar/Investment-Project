import { Routes } from '@angular/router';
import { DashBoard } from './Pages/dash-board/dash-board';
import { LoginComponent } from './Pages/log-in/log-in';
import { SignUpComponent } from './Pages/sign-up/sign-up';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    component: DashBoard,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  
];
