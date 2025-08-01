import { Component, inject } from '@angular/core';
import { AuthProviderBlock } from '../../../components/auth-provider-block/auth-provider-block';
import { Divider } from '../../../components/divider/divider';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../components/input-component/input-component';
import { CustomButton } from '../../../components/custom-button/custom-button';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../service/auth/auth-service';
import { environment } from '../../../../environments/environments';

@Component({
  selector: 'app-register-page',
  imports: [
    CommonModule,
    AuthProviderBlock,
    Divider,
    InputComponent,
    ReactiveFormsModule,
    CustomButton,
    RouterLink,
  ],
  templateUrl: './register-page.html',
  styleUrls: ['./register-page.css', '../auth.css'],
})
export class RegisterPage {
  authService = inject(AuthService);
  router = inject(Router);

  registerLoading$ = this.authService.getRegisterLoading();

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  registerWithGoogle() {
    window.location.href = environment.googleAuthUrl;
  }

  async handleLogin() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    await this.authService.register(
      this.username.value,
      this.firstName.value,
      this.lastName.value,
      this.email.value,
      this.password.value
    );
    this.router.navigate(['/']);
  }

  get firstName() {
    return this.registerForm.get('firstName') as FormControl;
  }

  get lastName() {
    return this.registerForm.get('lastName') as FormControl;
  }

  get username() {
    return this.registerForm.get('username') as FormControl;
  }

  get email() {
    return this.registerForm.get('email') as FormControl;
  }

  get password() {
    return this.registerForm.get('password') as FormControl;
  }
}
