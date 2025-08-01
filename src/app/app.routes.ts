import { Routes } from '@angular/router';
import { LoginPage } from './pages/auth/login-page/login-page';
import { HomePage } from './pages/home-page/home-page';
import { authGuard } from './guards/auth-guard';
import { unauthGuard } from './guards/unauth-guard';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { RegisterPage } from './pages/auth/register-page/register-page';
import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
  {
    canActivate: [authGuard],
    path: '',
    children: [
      {
        path: '',
        component: MainLayout,
        children: [
          {
            path: '',
            component: HomePage,
          },
        ],
      },
    ],
  },
  {
    canActivate: [unauthGuard],
    path: '',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        component: LoginPage,
      },
      {
        path: 'register',
        component: RegisterPage,
      },
    ],
  },
];
