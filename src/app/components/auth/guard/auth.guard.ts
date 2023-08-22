import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
export const AuthGuard: CanActivateFn = (route, state): boolean => {
  const router = inject(Router);
  const currentUserService = inject(AuthService);

  if (currentUserService.currentUser) {
    console.log("guardauth")
    if (state.url === '/') {
        router.navigate(['/dashboard']);
    }
    return true;
  }
  console.log("not guardauth")

  router.navigate(['/auth/login']);
  return false;
}
