import { CanActivateFn, CanMatchFn } from '@angular/router';
import { inject } from '@angular/core';
import { MLoginService } from '../modulo-login/services/m-login.service';




const checkLogin = ():boolean => {
  const loginService = inject(MLoginService)
  return loginService.checkLogin()
};

export const canActivate: CanActivateFn = () => {
  return checkLogin();
};
export const canMatch: CanMatchFn = (route, segments) => {
  return checkLogin();
};
