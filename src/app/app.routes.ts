import { Routes } from '@angular/router';
import { DashBoard } from './Pages/dash-board/dash-board';
import { ProjectList } from './Components/project-list/project-list';
import { LoginComponent } from './Pages/log-in/log-in';
import { SignUpComponent } from './Pages/sign-up/sign-up';
import { Home } from './Pages/home/home';
import { userExistGuard } from './Guards/user-exist-guard';

export const routes: Routes = [
  // --- PUBLIC ROUTES (No guards needed) ---
  {
    path: '',
    pathMatch: 'full',
    component: Home, // The Landing Page is the default front door
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

  // --- FALLBACK ROUTE ---
  {
    path: '**', // If a user types a random URL, send them back to the landing page
    redirectTo: '',
  }
];
