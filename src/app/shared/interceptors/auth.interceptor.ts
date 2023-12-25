import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  private auth = inject(AuthService)

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.user().access_token) {
      request = request.clone({
          setHeaders: {
              Authorization: `Bearer ${this.auth.user().access_token}`
          }
      });
    }

    return next.handle(request);
  }
}
