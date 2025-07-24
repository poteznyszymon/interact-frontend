import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
    {
        path: "",
        children: [
            {
                path: "",
                component: MainLayout,
                children: [
                    {
                        path: "",
                        component: LoginPage
                    }
                ]
            }
        ]
    }
];
