import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './service/theme-service';
import { ToastComponent } from './components/toast-component/toast-component';


export class AppModule { }
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'interact-frontend';

  constructor(private themeService: ThemeService) {
  }

  onSwitch () {
    this.themeService.toggleTheme();
  }

}
