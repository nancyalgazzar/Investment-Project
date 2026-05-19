import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userExistGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const currentUser = localStorage.getItem('currentUser');

  if (currentUser) {
    return true; // user logged in
  }

  // redirect to login if not logged in
  router.navigate(['/login']);

  return false;
};