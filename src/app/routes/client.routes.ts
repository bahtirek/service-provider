import { Route } from '@angular/router';
import { ClientShellComponent } from '../pages/client/client-shell.component';


export const CLIENT_ROUTES: Route[] = [
  {path: '', component: ClientShellComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('../pages/client/dashboard/dashboard.component').then(c => c.DashboardComponent)
      },
      {
        path: 'provider-list',
        loadChildren: () => import('./providers.routes').then((m) => m.PROVIDERS_ROUTES),
      },
      {
        path: 'messages',
        loadComponent: () => import('../pages/messages/messages.component').then((c) =>c.MessagesComponent),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ]
  },
];
