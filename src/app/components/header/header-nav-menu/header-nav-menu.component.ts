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
      url: '/search/providers'
    },
  ]
  loggedInMenuItems: HeaderNavMenu[] = []

  clientMenuItems: HeaderNavMenu[] = [
    {
      name: 'Dashboard',
      url: 'client/dashboard'
    },
    {
      name: 'Find Provider',
      url: '/search/providers'
    },
    {
      name: 'My Profile',
      url: `client/profile`
    },
  ]
  providerMenuItems: HeaderNavMenu[] = [
    {
      name: 'Dashboard',
      url: 'provider/dashboard'
    },
    {
      name: 'My Profile',
      url: `provider/profile`
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
