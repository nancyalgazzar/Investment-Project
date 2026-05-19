import { Routes } from '@angular/router';
import { DashBoard } from './Pages/dash-board/dash-board';
import { ProjectList } from './Components/project-list/project-list';

import { DetailsCard } from './Components/details-card/details-card';
import { SignUpComponent } from './Pages/sign-up/sign-up';
import { LoginComponent } from './Pages/log-in/log-in';
import { Home } from './Pages/home/home';
import { LandingComponent } from './Pages/landing/landing';
import { userExistGuard } from './Guards/user-exist-guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },

  // --- PROTECTED ROUTES (Locked behind the Guard) ---
  {
    path: 'dashboard',
    component: DashBoard,
    canActivate: [userExistGuard], // Protects the dashboard
  },
  {
    path: 'projects',
    component: ProjectList,
    canActivate: [userExistGuard], // Protects the project list
  },

  {
    path: '**',
    redirectTo: ''
  }
];
