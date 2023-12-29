import { Route } from '@angular/router';

export const SEARCH_ROUTES: Route[] = [
  {
    path: 'providers',
    loadComponent: () => import('../pages/search/providers/providers.component').then(c => c.ProvidersComponent),
  },
  {
    path: 'services',
    loadComponent: () => import('../pages/search/services/services.component').then(c => c.ServicesComponent),
  },
  {
    path: '',
    redirectTo: 'providers',
    pathMatch: 'full',
  },
];
