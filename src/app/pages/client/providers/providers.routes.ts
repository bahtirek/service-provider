import { Route } from '@angular/router';

export const PROVIDERS_ROUTES: Route[] = [
  { path: '', loadComponent: () => import('./providers.component').then(c => c.ProvidersComponent) },
  { path: ':id', loadComponent: () => import('./provider/provider.component').then(c => c.ProviderComponent) },
  {
    path: '',
    redirectTo: 'providers',
    pathMatch: 'full',
  },
];
