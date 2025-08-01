import { Component, HostListener, inject } from '@angular/core';
import { ThemeService } from '../../service/theme/theme-service';
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CustomButton } from '../../components/custom-button/custom-button';
import { AuthService } from '../../service/auth/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  imports: [
    LucideAngularModule,
    RouterOutlet,
    CustomButton,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css', '../layouts.css'],
})
export class MainLayout {
  private themeService: ThemeService = inject(ThemeService);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  logoutLoading$ = this.authService.getLogoutLoading();

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

  handleThemeChange(): void {
    this.themeService.toggleTheme();
  }

  get isDarkTheme(): boolean {
    return this.themeService.isDarkTheme;
  }

  scrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 50;
  }

  readonly sunIcon = Sun;
  readonly moonIcon = Moon;
}
