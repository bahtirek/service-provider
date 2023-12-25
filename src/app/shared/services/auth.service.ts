import { Injectable, computed, inject, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Credentials } from '../interfaces/credentials.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { shareReplay } from 'rxjs/operators';

export type AuthUser = any | null | undefined;

interface AuthState {
  user: AuthUser;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private url = environment.apiUrl;
  http = inject(HttpClient);

  // state
  private state = signal<AuthState>({
    user: undefined,
  });

  isLoggedIn = signal<boolean>(false);

  // selectors
  user = computed(() => this.state().user);

  constructor( ) {
    this.getUser()
  }

  login(credentials: Credentials) {
    return this.http.post<User>(this.url + '/auth/login', credentials).pipe(shareReplay());
  }

  logout() {
    window.sessionStorage.removeItem('user');
    //this.state.update((state) => ({null})
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
