import { Component, inject } from '@angular/core';
import { CustomButton } from '../../../components/custom-button/custom-button';
import { InputComponent } from '../../../components/input-component/input-component';
import { AuthProviderBlock } from '../../../components/auth-provider-block/auth-provider-block';
import { Divider } from '../../../components/divider/divider';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../service/auth/auth-service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environments';

@Component({
  selector: 'app-login-page',
  imports: [
    CustomButton,
    InputComponent,
    AuthProviderBlock,
    Divider,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.css', '../auth.css'],
})
export class LoginPage {
  authService = inject(AuthService);
  router = inject(Router);

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  loginWithGoogle() {
    window.location.href = environment.googleAuthUrl;
  }

  async handleLogin(event: Event) {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    if (this.username && this.password) {
      await this.authService.login(this.username.value, this.password.value);
      this.router.navigate(['/']);
    }
  }

  loginLoading$ = this.authService.getLoginLoading();

  get username() {
    return this.loginForm.get('username') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }
}
