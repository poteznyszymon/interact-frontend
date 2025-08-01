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

  if (!isAuthenticated) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
