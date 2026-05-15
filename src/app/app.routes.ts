import { Routes } from '@angular/router';
import { DashBoard } from './Pages/dash-board/dash-board';

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
];
