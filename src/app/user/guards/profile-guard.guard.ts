import { CanActivateFn, CanMatchFn } from '@angular/router';


export const profileGuardGuardActivate: CanActivateFn = () => {
  const isLogin = localStorage.getItem('token');
  if (isLogin!== null) {
    return true;
  }
  return false;
};
export const profileGuardGuardMatch: CanMatchFn = (route, segments) => {
  const isLogin = localStorage.getItem('token');
  if (isLogin!== null) {
    return true;
  }
  return false;
};
