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
  userRoute: string = 'client';

  ngOnInit(){
    if(this.auth.user().user?.isProvider) {
      this.loggedInMenuItems = this.providerMenuItems
    } else {
      this.loggedInMenuItems = this.clientMenuItems
    }
  }

  loggedIn = computed(() =>
    this.auth.isLoggedIn()
  );

  logout = () => {
    this.auth.logout('home');
  }

  menuItems: HeaderNavMenu[] = [
    {
      name: 'Find Provider',
      url: '/search/providers',
      icon: 'search'
    },
  ]
  loggedInMenuItems: HeaderNavMenu[] = []

  clientMenuItems: HeaderNavMenu[] = [
    {
      name: 'Dashboard',
      url: 'client/dashboard',
      icon: 'dashboard'
    },
    {
      name: 'Find Provider',
      url: '/search/providers',
      icon: 'search'
    },
    {
      name: 'My Profile',
      url: `client/profile`,
      icon: 'manage_accounts'
    },
  ]
  providerMenuItems: HeaderNavMenu[] = [
    {
      name: 'Dashboard',
      url: 'provider/dashboard',
      icon: 'dashboard'
    },
    {
      name: 'My Profile',
      url: `provider/profile`,
      icon: 'manage_account'
    },
    {
      name: 'Find Provider',
      url: '/search/providers',
      icon: 'search'
    },
  ]
  authMenuItems: HeaderNavMenu[] = [
    {
      name: 'Login',
      url: 'auth/login',
      icon: 'login'
    },
    {
      name: 'Sign up',
      url: 'auth/registration',
      icon: 'person_add'
    }
  ]
}
