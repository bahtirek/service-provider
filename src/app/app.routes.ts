import { Routes } from '@angular/router';
import { isAuthenticatedGuard, isNonAuthenticatedGuard } from './shared/guards/auth.guard';
export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [isNonAuthenticatedGuard()],
    loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'client',
    canActivate: [isAuthenticatedGuard()],
    loadChildren: () => import('./pages/client/client.routes').then((m) => m.CLIENT_ROUTES),
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.routes').then((m) => m.SEARCH_ROUTES),
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent),
  },

  /* {
    path: '',
    loadComponent: () => import('./pages/').then(c => c.Component),
  }, */
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  /* { path: '**', redirectTo: 'home', pathMatch: 'full' } */
];
