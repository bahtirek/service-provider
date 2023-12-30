import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      if([401, 403].includes(error.status)) {
        console.log('error');
        alert('You are not authorized to access this page.');

      }
      return throwError(() => error);
    })
  )
};
