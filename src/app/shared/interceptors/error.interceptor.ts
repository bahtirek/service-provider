import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToasterService } from '../../components/toaster/toaster.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toaster = inject(ToasterService);
  return next(req).pipe(
    catchError((error) => {
      if([401, 403].includes(error.status)) {
        console.log(error);
        toaster.show('error', 'Sorry!', 'Something went wrong. Please try later. ')
      } else {
        toaster.show('error', 'Sorry!', 'Something went wrong. Please try later. ')
      }
      return throwError(() => error);
    })
  )
};
