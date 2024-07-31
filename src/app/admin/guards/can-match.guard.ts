import { CanMatchFn } from '@angular/router';

export const canMatchGuard: CanMatchFn = (route, segments) => {
  const foundUser = localStorage.getItem('token')
  if (foundUser)
    return true;
  return false;
};
