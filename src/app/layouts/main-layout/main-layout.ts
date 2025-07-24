import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomButton } from '../../components/custom-button/custom-button';
import { ThemeService } from '../../service/theme-service';
import { Sun, LucideAngularModule, Moon } from 'lucide-angular';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, CustomButton, LucideAngularModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayout {
  private themeService: ThemeService = inject(ThemeService)

  handleThemeChange(): void {
    this.themeService.toggleTheme();
  }

  get isDarkTheme(): boolean {
    return this.themeService.isDarkTheme;
  }

  sunIcon = Sun;
  moonIcon = Moon;
}
