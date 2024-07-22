import { CanActivateFn } from '@angular/router';

export const isLoginActivateGuard: CanActivateFn = (route, state) => {
  const foundUser = localStorage.getItem('tokenAdmin')
  if (foundUser)
    return false;
  return true;
};
