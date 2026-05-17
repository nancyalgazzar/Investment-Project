import { Routes } from '@angular/router';
import { DashBoard } from './Pages/dash-board/dash-board';
import { ProjectList } from './Components/project-list/project-list';

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
  }
];
