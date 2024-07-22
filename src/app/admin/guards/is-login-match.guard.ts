import { CanMatchFn } from '@angular/router';

export const isLoginMatchGuard: CanMatchFn = (route, segments) => {
  const foundUser = localStorage.getItem('tokenAdmin')
  if (foundUser)
    return false;
  return true;
};
