import { CanActivateFn } from '@angular/router';

export const canActivateGuard: CanActivateFn = (route, state) => {
  const foundUser = localStorage.getItem('token')
  if(foundUser)
    return true;
  return false;
};
