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
    canActivate: [isAuthenticatedGuard()],
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent),
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' }
];
