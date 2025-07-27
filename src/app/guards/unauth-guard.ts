import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth/auth-service';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export const unauthGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = await firstValueFrom(
    authService.isUserAuthenticated()
  );

  console.log('UnauthGuard: isAuthenticated =', isAuthenticated);

  if (!isAuthenticated) {
    console.log(
      'UnauthGuard: User is NOT authenticated. Allowing access to /login.'
    );
    return true;
  }

  console.log('UnauthGuard: User IS authenticated. Redirecting to /.');
  router.navigate(['/']);
  return false;
};
