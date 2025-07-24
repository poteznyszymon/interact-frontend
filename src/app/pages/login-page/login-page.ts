import { Component, inject } from '@angular/core';
import { ToastService } from '../../service/toast-service';
import { CustomButton } from '../../components/custom-button/custom-button';

@Component({
  selector: 'app-login-page',
  imports: [CustomButton],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {
  toastService: ToastService = inject(ToastService);

  addToast(type: 'success' | 'error') {
    this.toastService.add("Some message", type)
  }
}
