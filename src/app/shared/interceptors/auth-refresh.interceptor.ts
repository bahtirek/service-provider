import { Injectable, inject } from '@angular/core';
import { from, lastValueFrom } from "rxjs";
import {  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { ToasterService } from '../../components/toaster/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRefreshInterceptor implements HttpInterceptor {
  auth = inject(AuthService);
  toaster = inject(ToasterService);

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return from(this.handle(req, next))
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.auth?.user()?.accessToken) return await lastValueFrom(next.handle(req));
    if (this.auth.isTokenExpired()) {
      const user$ = this.auth.refreshToken();
      const user = await lastValueFrom(user$);
      this.auth.setUser(user);
      this.toaster.show('success', `Attn`, 'Token refreshed.');
    }
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.auth.user()?.accessToken}`)
    })

    return await lastValueFrom(next.handle(req));
  }
}
