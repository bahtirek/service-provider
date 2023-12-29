import { Route } from '@angular/router';
import { ProviderShellComponent } from './provider-shell.component';


export const PROVIDER_ROUTES: Route[] = [
  {path: '', component: ProviderShellComponent,
    children: [
      {
        path: 'profile-form',
        loadComponent: () => import('./profile-form/profile-form.component').then((c) =>c.ProfileFormComponent),
      },
      /* {
        path: 'profile-details',
        loadComponent: () => import('./profile-details/profile-details.component').then((c) =>c.ProfileDetailsComponent),
      }, */
      {
        path: '',
        redirectTo: 'profile-form',
        pathMatch: 'full',
      },
    ]
  },
];
