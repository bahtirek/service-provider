import { Route } from '@angular/router';

export const AUTH_ROUTES: Route[] = [
  { path: 'login', loadComponent: () => import('./login/login.component').then(c => c.LoginComponent) },
  {
    path: 'registration',
    loadComponent: () => import('./registration/registration.component').then(c => c.RegistrationComponent)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
