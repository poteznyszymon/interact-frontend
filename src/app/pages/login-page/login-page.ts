import { Component, inject } from '@angular/core';
import { ToastService } from '../../service/toast-service';
import { CustomButton } from '../../components/custom-button/custom-button';
import { InputComponent } from '../../components/input-component/input-component';
import { BadgeComponent } from '../../components/badge-component/badge-component';
import { AuthProviderBlock } from '../../components/auth-provider-block/auth-provider-block';
import { Divider } from '../../components/divider/divider';

@Component({
  selector: 'app-login-page',
  imports: [
    CustomButton,
    InputComponent,
    BadgeComponent,
    AuthProviderBlock,
    Divider,
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  toastService: ToastService = inject(ToastService);

  addToast(type: 'success' | 'error') {
    this.toastService.add('Some message', type);
  }
}
