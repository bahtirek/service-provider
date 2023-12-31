import { Injectable, computed, inject, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Credentials } from '../interfaces/credentials.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthUser } from '../interfaces/auth.interface';

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

  registration(user: User) {
    return this.http.post<User>(this.url + '/users/user', user).pipe(shareReplay());
  }

  logout() {
    window.sessionStorage.removeItem('user');
    this.state.update(state => null);
    this.isLoggedIn.set(false);
    this.router.navigate(['home']);
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

    this.state.update((state) => ({
      ...state,
      user,
    }))
    this.isLoggedIn.set(true);
  }
}
