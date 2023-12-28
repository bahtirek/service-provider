import { Route } from '@angular/router';
import { ClientShellComponent } from './client-shell.component';


export const CLIENT_ROUTES: Route[] = [
  {path: '', component: ClientShellComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent)
      },
      {
        path: 'provider-list',
        loadChildren: () => import('../../shared/routes/providers.routes').then((m) => m.PROVIDERS_ROUTES),
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
    ]
  },
];
