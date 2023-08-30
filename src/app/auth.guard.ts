import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Configure the AuthGuard Constant
 */
export const authGuard: CanActivateFn = (route, state) => {
  let isLoggedIn = inject(AuthService).isLoggedIn;
  console.log(isLoggedIn);

  if (isLoggedIn == false) {
    inject(Router).navigateByUrl('/login');
  }

  return isLoggedIn;
};
