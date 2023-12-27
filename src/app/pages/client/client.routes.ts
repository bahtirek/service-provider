import { Route } from '@angular/router';
import { ClientComponent } from './client.component';

export const CLIENT_ROUTES: Route[] = [
  {path: '', component: ClientComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent)
      },
      {
        path: 'provider-list',
        loadChildren: () => import('./provider-list/providers.routes').then((m) => m.PROVIDERS_ROUTES),
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
    ]
  },
];
