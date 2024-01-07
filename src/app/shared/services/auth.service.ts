import { Injectable, computed, inject, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Credentials } from '../interfaces/credentials.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { shareReplay, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthUser } from '../interfaces/auth.interface';
import { lastValueFrom } from 'rxjs';

interface AuthState {
  user?: User;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private url = environment.apiUrl;
  private http = inject(HttpClient);
  private router = inject(Router);

  // state
  private state = signal<AuthState | null>({
    user: undefined,
  });

  isLoggedIn = signal<boolean>(false);

  // selectors
  user = computed(() => this.state()?.user);

  constructor( ) {
    this.getUser()

  }

  login(credentials: Credentials) {
    return this.http.post<AuthUser>(this.url + '/auth/login', credentials).pipe(shareReplay());
  }

  refreshToken() {
    const accessToken = this.user()?.accessToken;
    console.log(accessToken);

    return this.http.post<AuthUser>(this.url + '/auth/refresh', {accessToken: accessToken}).pipe(take(1));
  }

  registration(user: User) {
    return this.http.post<User>(this.url + '/users/user', user).pipe(shareReplay());
  }

  logout(route: string = 'home') {
    window.sessionStorage.removeItem('user');
    this.state.update(state => null);
    this.isLoggedIn.set(false);
    this.router.navigate([route]);
  }

  setUser(user: User) {
    window.sessionStorage.setItem('user', JSON.stringify(user));
    this.state.update((state) => ({
      ...state,
      user,
    }))
    this.isLoggedIn.set(true);
  }

  getUser() {
    if(window.sessionStorage.getItem('user') == null) return;
    const user = JSON.parse(window.sessionStorage.getItem('user')!);

    if(this.isTokenExpired()) {
      this.refreshTokenIfExpired();
    } else {
      this.state.update((state) => ({
        ...state,
        user,
      }))
      this.isLoggedIn.set(true);
    }
  }

  refreshTokenIfExpired() {
    if(this.isTokenExpired()) {
      this.refreshToken().subscribe({
        next: (user) => {
          this.setUser(user);
        },
        error: (err) => {
          this.isLoggedIn.set(false);
          //this.logout('login');
        }
      })
    }
  }

  isTokenExpired() {
    const JWT = this.user()?.accessToken;
    if(!JWT) return false;
    const jwtPayload = JSON.parse(window.atob(JWT.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    if(jwtPayload.exp - currentTime > 10) return false;
    return true;
  }
}
