import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../Services/authentication-service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = inject(AuthenticationService)
  const userStorage = localStorage.getItem('currentUser');
  console.log(userStorage);
  if (userStorage) {
    const userObj = JSON.parse(userStorage);
    
    const currentUser = Array.isArray(userObj) ? userObj[0] : userObj;
    console.log(currentUser);
    if (currentUser.role == 'admin') {
      return true;
    }
  }
  user.logout();
  router.navigate(['']);
  return false;
};
