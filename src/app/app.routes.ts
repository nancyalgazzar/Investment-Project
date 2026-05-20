import { PayPal } from './Components/pay-pal/pay-pal';
import { Routes } from '@angular/router';
import { DashBoard } from './Pages/dash-board/dash-board';
import { ProjectList } from './Pages/project-list/project-list';
import { SignUpComponent } from './Pages/sign-up/sign-up';
import { LoginComponent } from './Pages/log-in/log-in';
import { Home } from './Pages/home/home';
import { LandingComponent } from './Pages/landing/landing';
import { userExistGuard } from './Guards/user-exist-guard';
import { DepositFunds } from './Pages/deposit-funds/deposit-funds';
import { DetailsCard } from './Pages/details-card/details-card';

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
    path: 'home',
    component: Home, // <-- This adds the Sidebar, Header, and Chatbot!
    canActivate: [userExistGuard], // Protects everything inside
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashBoard, // Renders inside Home's <router-outlet>
      },
      {
        path: 'projects',
        component: ProjectList,
      },
      {
        path: 'details/:id',
        component: DetailsCard,
      },
      {
        path: 'paypal/:id&:check',
        component: PayPal,
      }
    ]
  },

  // --- FALLBACK ---

  {
    path: 'deposit', //Gamal
    component: DepositFunds,
  },
  {
    path: '**',
    redirectTo: '',
  },
  {
    path: 'projects',
    component: ProjectList,
  },
];
