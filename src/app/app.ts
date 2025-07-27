import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './service/theme/theme-service';
import { ToastComponent } from './components/toast-component/toast-component';
import { AuthService } from './service/auth/auth-service';

export class AppModule {}
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'interact-frontend';

  constructor(private themeService: ThemeService) {}

  onSwitch() {
    this.themeService.toggleTheme();
  }
}
