import { Route } from '@angular/router';
import { ProviderShellComponent } from '../pages/provider/provider-shell.component';


export const PROVIDER_ROUTES: Route[] = [
  {path: '', component: ProviderShellComponent,
    children: [
      {
        path: 'profile-form',
        loadComponent: () => import('../pages/provider/profile-form/profile-form.component').then((c) =>c.ProfileFormComponent),
      },
      {
        path: 'dashboard',
        loadComponent: () => import('../pages/provider/dashboard/dashboard/dashboard.component').then((c) =>c.DashboardComponent),
      },
      {
        path: 'message',
        loadChildren: () => import('./messages.routes').then((m) => m.MESSAGES_ROUTES),
      },
      {
        path: 'my-client',
        loadComponent: () => import('../pages/provider/dashboard/my-client/my-client.component').then((c) =>c.MyClientComponent),
        children: [
          {
            path: 'chat',
            loadComponent: () => import('../pages/message/chat/chat.component').then((c) =>c.ChatComponent),
          },
          {
            path: 'details',
            loadComponent: () => import('../pages/provider/dashboard/my-client/client-details/client-details.component').then((c) =>c.ClientDetailsComponent),
          },
          {
            path: '',
            redirectTo: 'details',
            pathMatch: 'full',
          }
        ]
      },
      {
        path: 'profile',
        loadComponent: () => import('../pages/provider/profile/profile.component').then((c)=>c.ProfileComponent)
      },
      {
        path: '',
        redirectTo: 'message',
        pathMatch: 'full',
      },
    ]
  },
];
