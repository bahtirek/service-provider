import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  if (!auth?.user()?.accessToken) return next(req);
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${auth.user().accessToken}`)
    })
  return next(authReq);
};
