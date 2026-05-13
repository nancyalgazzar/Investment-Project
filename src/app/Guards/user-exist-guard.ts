import { CanActivateFn } from '@angular/router';

export const userExistGuard: CanActivateFn = (route, state) => {
  return true;
};
