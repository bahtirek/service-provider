import { Routes } from '@angular/router';
import { isAuthenticatedGuard, isNonAuthenticatedGuard } from './shared/guards/auth.guard';
export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [isNonAuthenticatedGuard()],
    loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent),
  },
  {
    path: 'providers',
    loadComponent: () => import('./pages/providers/providers.component').then(c => c.ProvidersComponent),
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services.component').then(c => c.ServicesComponent),
  },
  /* {
    path: '',
    loadComponent: () => import('./pages/').then(c => c.Component),
  }, */
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
