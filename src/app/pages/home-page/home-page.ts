import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth/auth-service';
import { Router } from '@angular/router';
import { CustomButton } from '../../components/custom-button/custom-button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [CustomButton, CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  authService = inject(AuthService);
  router = inject(Router);

  logoutLoading$ = this.authService.getLogoutLoading();

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}
