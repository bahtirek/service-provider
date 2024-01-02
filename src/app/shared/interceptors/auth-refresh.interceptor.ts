import { Injectable, inject } from '@angular/core';
import { from, lastValueFrom, shareReplay, take } from "rxjs";
import {  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { ToasterService } from '../../components/toaster/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRefreshInterceptor implements HttpInterceptor {
  auth = inject(AuthService);
  toaster = inject(ToasterService);
  count=0

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return from(this.handle(req, next))
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.auth?.user()?.accessToken) return await lastValueFrom(next.handle(req));
    console.log(this.count);

    if (this.auth.isTokenExpired() && this.count == 0) {
      console.log('ini');
      this.count++
      const user$ = this.auth.refreshToken();
      const user = await lastValueFrom(user$);
      this.auth.setUser(user);
      this.toaster.show('success', `Attn`, 'Token refreshed.');
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.user()?.accessToken}`
        }
      })

      return await lastValueFrom(next.handle(authReq));
    } else {
      return await lastValueFrom(next.handle(req))
    }

  }
}
