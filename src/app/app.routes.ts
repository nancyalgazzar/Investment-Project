import { Routes } from '@angular/router';
import { DashBoard } from './Pages/dash-board/dash-board';
import { ProjectList } from './Components/project-list/project-list';
import { DepositFunds } from './Pages/deposit-funds/deposit-funds';
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
    path: 'projects',
    component: ProjectList,
  },
  {
    path: 'deposit',  //Gamal
    component: DepositFunds,}
];
