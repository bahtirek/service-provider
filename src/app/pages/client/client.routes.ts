import { Route } from '@angular/router';

export const CLIENT_ROUTES: Route[] = [
  { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent) },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
