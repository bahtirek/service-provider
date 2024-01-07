import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderNavMenu } from '../../../shared/interfaces/header-nav-menu.interface';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-header-nav-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header-nav-menu.component.html',
  styleUrl: './header-nav-menu.component.scss'
})
export class HeaderNavMenuComponent {
  private auth = inject(AuthService);

  loggedIn = computed(() =>
    this.auth.isLoggedIn()
  );

  logout = () => {
    this.auth.logout('home');
  }

  menuItems: HeaderNavMenu[] = [
    {
      name: 'Providers',
      url: '/search/providers'
    },
    {
      name: 'Services',
      url: '/search/services'
    },

  ]
  loggedInMenuItems: HeaderNavMenu[] = [
    {
      name: 'Dashboard',
      url: 'client'
    },
    {
      name: 'Account',
      url: 'client/account'
    }
  ]
  authMenuItems: HeaderNavMenu[] = [
    {
      name: 'Login',
      url: 'auth/login'
    },
    {
      name: 'Sign up',
      url: 'auth/registration'
    }
  ]
}
