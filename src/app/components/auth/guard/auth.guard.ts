import { Injectable, inject } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators';
// export const AuthGuard: CanActivateFn = (route, state): boolean => {
//   const router = inject(Router);
//   const currentUserService = inject(AuthService);

//   if (currentUserService.currentUser) {
//     console.log("guardauth")
//     if (state.url === '/') {
//         router.navigate(['/dashboard']);
//     }
//     return true;
//   }
//   console.log("not guardauth")

//   router.navigate(['/auth/login']);
//   return false;
// }
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: NbAuthService, private router: Router) {
  }

  canActivate() {
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            this.router.navigate(['/auth/login']);
          }
        }),
      );
  }
}