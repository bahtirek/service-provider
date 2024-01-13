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
        path: 'my-provider/:providerId/:userId',
        loadComponent: () => import('../pages/client/my-provider/my-provider.component').then((c) => c.MyProviderComponent),
      },
      {
        path: 'my-provider/:providerId/:userId/messages/:subjectId',
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
